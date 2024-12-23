export const imageUtils = {
  toBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  },

  validateImageSize: (file: File, maxSizeInMB: number = 5): boolean => {
    const maxSize = maxSizeInMB * 1024 * 1024; // Convert to bytes
    return file.size <= maxSize;
  },

  validateImageType: (file: File): boolean => {
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedTypes.includes(file.type);
  },

  resizeImage: async (base64: string, maxWidth: number = 800): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth * height) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
    });
  }
};
