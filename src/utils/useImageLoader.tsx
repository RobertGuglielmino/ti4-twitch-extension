import { useEffect, useState } from "react";

const imageCache = new Set();

export default function useImageLoader(src) {
  const [loaded, setLoaded] = useState(imageCache.has(src));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (imageCache.has(src)) {
      setLoaded(true);
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.add(src);
      setLoaded(true);
    };
    img.onerror = () => setError(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error };
}