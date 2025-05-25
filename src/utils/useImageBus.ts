// Add logging to see what paths are being generated
const getImageSrc = (id: string) => {
  const image = images.find((img) => img.id === id);
  console.log(`Looking for image with id: ${id}, found:`, image);
  return image ? image.src : null;
};