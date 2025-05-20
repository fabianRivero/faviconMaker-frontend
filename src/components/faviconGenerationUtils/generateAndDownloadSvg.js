export default function generateAndDownloadSvg(
  loadedImage,
  cropBox,
  offset,
  zoom,
  filters = {},
  borderRadius = 0
) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      const filterString = `
        brightness(${filters.brightness || 1}) 
        saturate(${filters.saturation || 1}) 
        blur(${filters.blur || 0}px) 
        invert(${filters.invert || 0})
      `.trim();
      ctx.filter = filterString;
      
      const r = borderRadius * (64 / cropBox.size);
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(64 - r, 0);
      ctx.quadraticCurveTo(64, 0, 64, r);
      ctx.lineTo(64, 64 - r);
      ctx.quadraticCurveTo(64, 64, 64 - r, 64);
      ctx.lineTo(r, 64);
      ctx.quadraticCurveTo(0, 64, 0, 64 - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.clip();
      
      ctx.drawImage(
        loadedImage,
        (cropBox.x - offset.x) / zoom,
        (cropBox.y - offset.y) / zoom,
        cropBox.size / zoom,
        cropBox.size / zoom,
        0,
        0,
        64,
        64
      );
      
      const pngDataUrl = canvas.toDataURL('image/png');
      
      const svgContent = `
        <svg width="64" height="64" viewBox="0 0 64 64" 
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <clipPath id="roundedCorners">
              <rect width="64" height="64" rx="${r}" ry="${r}"/>
            </clipPath>
          </defs>
          <image 
            xlink:href="${pngDataUrl}" 
            width="64" 
            height="64" 
            clip-path="url(#roundedCorners)"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
      `;
      
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'favicon.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}