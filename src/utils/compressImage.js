// Shrinks a user-selected image before it is stored (as a data URL in IndexedDB).
//
// Why: phone screenshots/photos are often 1-8 MB. Stored as base64 they are ~33%
// bigger, slow down loading of all custom exercises and eat the browser's storage
// quota. The app only shows images at roughly 256 CSS px high, so 800 px on the
// long edge is plenty (it matches the built-in exercise images).
//
// Output is JPEG on purpose: Safari (iPhone) cannot encode WebP from a canvas and
// silently falls back to a much larger PNG.

const DEFAULT_MAX_DIMENSION = 800;
const DEFAULT_QUALITY = 0.8;
const KEEP_ORIGINAL_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

// Decodes the file honouring EXIF orientation, so portrait photos are not rotated.
const decodeImage = async (file) => {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        release: () => bitmap.close && bitmap.close(),
      };
    } catch (error) {
      // Fall through to the <img> based decoder (older browsers / unsupported options).
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unsupported image'));
      image.src = url;
    });
    // Modern browsers apply EXIF orientation automatically when drawing an <img>.
    return {
      source: img,
      width: img.naturalWidth,
      height: img.naturalHeight,
      release: () => {},
    };
  } finally {
    URL.revokeObjectURL(url);
  }
};

const dataUrlBytes = (dataUrl) => {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  return Math.floor((base64.length * 3) / 4);
};

/**
 * @param {File} file
 * @param {{maxDimension?: number, quality?: number}} [options]
 * @returns {Promise<{dataUrl: string, width: number, height: number,
 *                    originalBytes: number, bytes: number}>}
 * @throws if the browser cannot decode the image
 */
export const compressImageFile = async (file, options = {}) => {
  const maxDimension = options.maxDimension || DEFAULT_MAX_DIMENSION;
  const quality = options.quality || DEFAULT_QUALITY;

  const decoded = await decodeImage(file);
  try {
    const { source, width: srcWidth, height: srcHeight } = decoded;
    if (!srcWidth || !srcHeight) {
      throw new Error('Unsupported image');
    }

    const scale = Math.min(1, maxDimension / Math.max(srcWidth, srcHeight));
    const width = Math.max(1, Math.round(srcWidth * scale));
    const height = Math.max(1, Math.round(srcHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    // JPEG has no alpha: paint white first so transparent PNG areas are not black.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, width, height);

    const compressedUrl = canvas.toDataURL('image/jpeg', quality);
    const compressedBytes = dataUrlBytes(compressedUrl);

    // Already small enough and not larger than our result (e.g. a tiny PNG icon):
    // keep it untouched, which also preserves transparency.
    if (
      scale === 1 &&
      file.size <= compressedBytes &&
      KEEP_ORIGINAL_TYPES.includes(file.type)
    ) {
      const originalUrl = await readAsDataUrl(file);
      return {
        dataUrl: originalUrl,
        width,
        height,
        originalBytes: file.size,
        bytes: file.size,
      };
    }

    return {
      dataUrl: compressedUrl,
      width,
      height,
      originalBytes: file.size,
      bytes: compressedBytes,
    };
  } finally {
    decoded.release();
  }
};
