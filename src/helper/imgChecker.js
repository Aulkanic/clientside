// imageUtils.js

export const isImageBlurred = (file, threshold = 0.1) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = (readerEvent) => {
        const image = new Image();
  
        image.onload = () => {
          const naturalWidth = image.naturalWidth;
          const naturalHeight = image.naturalHeight;
  
          // Calculate aspect ratio
          const aspectRatio = naturalWidth / naturalHeight;
  
          // Check if the aspect ratio indicates low, normal, or high quality
          if (aspectRatio < 1 - threshold) {
            resolve('Low Quality');
          } else if (aspectRatio > 1 + threshold) {
            resolve('High Quality');
          } else {
            resolve('Normal Quality');
          }
        };
  
        image.onerror = () => {
          reject(new Error('Failed to load image'));
        };
  
        image.src = readerEvent.target.result;
      };
  
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
  
      reader.readAsDataURL(file);
    });
  };
  