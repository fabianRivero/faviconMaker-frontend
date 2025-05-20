export function dataURLToFile(dataUrl, filename) {
  try {
    if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image')) {
      throw new Error('Invalid DataURL format');
    }

    const parts = dataUrl.split(',');
    if (parts.length < 2) {
      throw new Error('Malformed DataURL');
    }

    const mimeMatch = parts[0].match(/:(.*?);/);
    if (!mimeMatch || mimeMatch.length < 2) {
      throw new Error('Could not extract MIME type');
    }
    const mime = mimeMatch[1];

    const binaryStr = atob(parts[1]);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    if (bytes.length < 100) { 
      throw new Error('Image data too small');
    }

    return new File([bytes], filename, { type: mime });
  } catch (err) {
    const fallback = new Uint8Array([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 
    ]);
    return new File([fallback], 'fallback.png', { type: 'image/png' });
  }
}