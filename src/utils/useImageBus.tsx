import { useCallback, useEffect, useState, useRef, useMemo } from "react";

// Global caches with proper typing
const imageCache = new Set<string>();
const imageErrors = new Set<string>();

// Enhanced type definitions
interface ImageItem {
  id: string;
  src: string;
  alt?: string;
  [key: string]: any; // Allow additional metadata
}

interface ImageState {
  loaded: boolean;
  error: boolean;
  loading: boolean;
}

interface ImageLoadingStates {
  [imageId: string]: ImageState;
}

interface ImageLoadResult {
  id: string;
  src: string;
  loaded: boolean;
  error: boolean;
}

interface UseImageBusOptions {
  loadConcurrently?: boolean;
  onProgress?: (progress: number, loaded: number, total: number) => void;
  onComplete?: (states: ImageLoadingStates, imageMap: Map<string, ImageItem>) => void;
  onError?: (id: string, src: string, imageItem: ImageItem) => void;
  onImageLoad?: (id: string, src: string, imageItem: ImageItem) => void;
}

interface UseImageBusReturn {
  // Individual image states by ID
  loadingStates: ImageLoadingStates;
  
  // Overall progress
  progress: number;
  isComplete: boolean;
  hasErrors: boolean;
  
  // Helper functions
  isImageLoaded: (id: string) => boolean;
  getImageById: (id: string) => ImageItem | undefined;
  getLoadedImages: () => ImageItem[];
  getFailedImages: () => ImageItem[];
  getImagesByMetadata: <T = any>(key: string, value: T) => ImageItem[];
  
  // Get image src by ID (for rendering)
  getImageSrc: (id: string) => string | undefined;
  
  // Counts
  totalImages: number;
  loadedCount: number;
  errorCount: number;
  loadingCount: number;
  
  // Access to full image data
  imageMap: Map<string, ImageItem>;
}

// Overloaded function signatures for backward compatibility
function useImageBus(
  images: string[], 
  options?: UseImageBusOptions
): UseImageBusReturn;

function useImageBus(
  images: ImageItem[], 
  options?: UseImageBusOptions
): UseImageBusReturn;

function useImageBus(
  images: (string | ImageItem)[] = [], 
  options: UseImageBusOptions = {}
): UseImageBusReturn {
  const {
    loadConcurrently = true,
    onProgress = null,
    onComplete = null,
    onError = null,
    onImageLoad = null
  } = options;

  // Use useRef to store the imageMap to prevent it from causing re-renders
  const imageMapRef = useRef(new Map<string, ImageItem>());
  
  // Use useMemo for normalizedImages to prevent unnecessary recalculations
  const normalizedImages = useMemo(() => {
    // Clear the map before populating it
    imageMapRef.current.clear();
    
    return images.map((item, index) => {
      if (typeof item === 'string') {
        const imageItem: ImageItem = {
          id: `image-${index}`, // Auto-generate ID for string inputs
          src: item
        };
        imageMapRef.current.set(imageItem.id, imageItem);
        return imageItem;
      } else {
        imageMapRef.current.set(item.id, item);
        return item;
      }
    });
  }, [images]); // Only recalculate when images array changes

  const [loadingStates, setLoadingStates] = useState<ImageLoadingStates>({});
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  // Load a single image
  const loadImage = useCallback((imageItem: ImageItem): Promise<ImageLoadResult> => {
    return new Promise<ImageLoadResult>((resolve) => {
      const { id, src } = imageItem;

      if (imageCache.has(src)) {
        if (onImageLoad) onImageLoad(id, src, imageItem);
        resolve({ id, src, loaded: true, error: false });
        return;
      }

      if (imageErrors.has(src)) {
        if (onError) onError(id, src, imageItem);
        resolve({ id, src, loaded: false, error: true });
        return;
      }

      const img = new Image();
      
      img.onload = (): void => {
        imageCache.add(src);
        if (onImageLoad) onImageLoad(id, src, imageItem);
        resolve({ id, src, loaded: true, error: false });
      };
      
      img.onerror = (): void => {
        imageErrors.add(src);
        if (onError) onError(id, src, imageItem);
        resolve({ id, src, loaded: false, error: true });
      };
      
      img.src = src;
    });
  }, [onError, onImageLoad]);

  // Start loading when images change
  useEffect(() => {
    // Skip if no images to load
    if (normalizedImages.length === 0) {
      setProgress(100);
      setIsComplete(true);
      setHasErrors(false);
      return;
    }

    // Initialize loading states first
    const initialStates: ImageLoadingStates = {};
    normalizedImages.forEach((imageItem: ImageItem) => {
      initialStates[imageItem.id] = {
        loaded: imageCache.has(imageItem.src),
        error: imageErrors.has(imageItem.src),
        loading: !imageCache.has(imageItem.src) && !imageErrors.has(imageItem.src)
      };
    });
    
    // Set initial states
    setLoadingStates(initialStates);
    
    // Calculate initial progress
    const initialCompleted = Object.values(initialStates).filter(
      state => state.loaded || state.error
    ).length;
    
    const initialProgress = Math.round((initialCompleted / normalizedImages.length) * 100);
    setProgress(initialProgress);
    setIsComplete(initialCompleted === normalizedImages.length);
    setHasErrors(Object.values(initialStates).some(state => state.error));
    
    // Only start loading images that aren't already loaded
    const imagesToLoad = normalizedImages.filter(img => 
      !imageCache.has(img.src) && !imageErrors.has(img.src)
    );
    
    if (imagesToLoad.length === 0) {
      // All images already cached
      if (onComplete) onComplete(initialStates, imageMapRef.current);
      return;
    }
    
    // Start loading process
    const loadImages = async () => {
      if (loadConcurrently) {
        const promises = imagesToLoad.map(loadImage);
        
        for (const promise of promises) {
          promise.then(result => {
            setLoadingStates(prev => {
              const newStates = {
                ...prev,
                [result.id]: {
                  loaded: result.loaded,
                  error: result.error,
                  loading: false
                }
              };
              
              // Calculate progress
              const completed = Object.values(newStates).filter(
                state => state.loaded || state.error
              ).length;
              
              const newProgress = Math.round((completed / normalizedImages.length) * 100);
              setProgress(newProgress);
              
              const allComplete = completed === normalizedImages.length;
              setIsComplete(allComplete);
              
              const anyErrors = Object.values(newStates).some(state => state.error);
              setHasErrors(anyErrors);
              
              if (onProgress) onProgress(newProgress, completed, normalizedImages.length);
              if (allComplete && onComplete) onComplete(newStates, imageMapRef.current);
              
              return newStates;
            });
          });
        }
        
        await Promise.allSettled(promises);
      } else {
        // Sequential loading
        for (const imageItem of imagesToLoad) {
          const result = await loadImage(imageItem);
          
          setLoadingStates(prev => {
            const newStates = {
              ...prev,
              [result.id]: {
                loaded: result.loaded,
                error: result.error,
                loading: false
              }
            };
            
            // Calculate progress
            const completed = Object.values(newStates).filter(
              state => state.loaded || state.error
            ).length;
            
            const newProgress = Math.round((completed / normalizedImages.length) * 100);
            setProgress(newProgress);
            
            const allComplete = completed === normalizedImages.length;
            setIsComplete(allComplete);
            
            const anyErrors = Object.values(newStates).some(state => state.error);
            setHasErrors(anyErrors);
            
            if (onProgress) onProgress(newProgress, completed, normalizedImages.length);
            if (allComplete && onComplete) onComplete(newStates, imageMapRef.current);
            
            return newStates;
          });
        }
      }
    };
    
    loadImages();
    
  }, [normalizedImages, loadConcurrently, loadImage, onProgress, onComplete, onError]);

  // Helper functions - use the ref for imageMap
  const isImageLoaded = useCallback((id: string): boolean => {
    return loadingStates[id]?.loaded || false;
  }, [loadingStates]);

  const getImageById = useCallback((id: string): ImageItem | undefined => {
    return imageMapRef.current.get(id);
  }, []);

  const getLoadedImages = useCallback((): ImageItem[] => {
    return normalizedImages.filter((item: ImageItem) => loadingStates[item.id]?.loaded);
  }, [normalizedImages, loadingStates]);

  const getFailedImages = useCallback((): ImageItem[] => {
    return normalizedImages.filter((item: ImageItem) => loadingStates[item.id]?.error);
  }, [normalizedImages, loadingStates]);

  const getImagesByMetadata = useCallback(<T = any>(key: string, value: T): ImageItem[] => {
    return normalizedImages.filter((item: ImageItem) => item[key] === value);
  }, [normalizedImages]);

  const getImageSrc = useCallback((id: string): string | undefined => {
    return imageMapRef.current.get(id)?.src;
  }, []);

  return {
    // Individual image states
    loadingStates,
    
    // Overall progress
    progress,
    isComplete,
    hasErrors,
    
    // Helper functions
    isImageLoaded,
    getImageById,
    getLoadedImages,
    getFailedImages,
    getImagesByMetadata,
    getImageSrc,
    
    // Counts
    totalImages: normalizedImages.length,
    loadedCount: Object.values(loadingStates).filter((s: ImageState) => s.loaded).length,
    errorCount: Object.values(loadingStates).filter((s: ImageState) => s.error).length,
    loadingCount: Object.values(loadingStates).filter((s: ImageState) => s.loading).length,
    
    // Access to full image data
    imageMap: imageMapRef.current
  };
}

export default useImageBus;
export type {
  ImageItem,
  ImageState,
  ImageLoadingStates,
  ImageLoadResult,
  UseImageBusOptions,
  UseImageBusReturn
};
