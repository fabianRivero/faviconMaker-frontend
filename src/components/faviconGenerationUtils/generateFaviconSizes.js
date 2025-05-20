export default function generateFaviconSizes(image, cropBox, offset, zoom, filter) {
  const sizes = [16, 32, 48, 64]; 
  const favicons = {};
  
  if (!image || !image.complete) {
    throw new Error("La imagen no está cargada completamente");
  }

  const filterString = `
    brightness(${filter.brightness ?? 1})
    saturate(${filter.saturation ?? 1})
    blur(${filter.blur ?? 0}px)
    invert(${filter.invert ?? 0})
  `.trim();

  try {
    for (const size of sizes) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      
      const sourceX = (cropBox.x - offset.x) / zoom;
      const sourceY = (cropBox.y - offset.y) / zoom;
      const sourceSize = cropBox.size / zoom;
      
      if (sourceSize <= 0) {
        throw new Error(`Tamaño de recorte inválido para ${size}x${size}`);
      }

      ctx.filter = filterString;
      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        size,
        size
      );
      
      favicons[`${size}x${size}`] = canvas.toDataURL("image/png");
    }
    
    if (!favicons["64x64"]) {
      throw new Error("No se pudo generar el tamaño 64x64");
    }

    return favicons;
    
  } catch (error) {
    throw new Error(`Error al generar favicons: ${error.message}`);
  }
}