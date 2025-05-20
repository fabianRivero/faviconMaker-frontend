import { useEffect } from "react";

export default function ImageCanvas({ canvasRef, editorState, appState, onStateUpdate, cropStart }) {
  const { loadedImage } = appState;
  const { cropBox, zoom, offset, brightness, saturation, blur, invert, borderRadius, isDraggingCrop } = editorState;

  useEffect(() => {
    if (!loadedImage) return;
    const canvas = canvasRef.current;
    const loadedImageScaledWidth = loadedImage.width * zoom;
    const loadedImageScaledHeight = loadedImage.height * zoom;
    onStateUpdate({
      offset: {
        x: (canvas.width - loadedImageScaledWidth) / 2,
        y: (canvas.height - loadedImageScaledHeight) / 2,
      }
    });
  }, [loadedImage, zoom]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImage) return;
    
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.filter = getFilterString();
    
    ctx.drawImage(
      loadedImage,
      offset.x,
      offset.y,
      loadedImage.width * zoom,
      loadedImage.height * zoom
    );

    drawCropBox(ctx);
  }, [loadedImage, cropBox, zoom, offset, brightness, saturation, blur, invert, borderRadius]);

  const getFilterString = () => {
    return `
      brightness(${brightness}) 
      saturate(${saturation}) 
      blur(${blur}px) 
      invert(${invert})
    `.trim();
  };

  const drawCropBox = (ctx) => {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const r = borderRadius;
    const { x, y, size } = cropBox;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + size - r, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + r);
    ctx.lineTo(x + size, y + size - r);
    ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
    ctx.lineTo(x + r, y + size);
    ctx.quadraticCurveTo(x, y + size, x, y + size - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      x >= cropBox.x &&
      x <= cropBox.x + cropBox.size &&
      y >= cropBox.y &&
      y <= cropBox.y + cropBox.size
    ) {
      onStateUpdate({ isDraggingCrop: true });
      cropStart.current = { x, y, cropX: cropBox.x, cropY: cropBox.y };
    } else {
      const startX = e.clientX;
      const startY = e.clientY;
      const initialOffset = { ...offset };

      const onMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        onStateUpdate({ offset: { x: initialOffset.x + dx, y: initialOffset.y + dy } });
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDraggingCrop || !cropStart.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - cropStart.current.x;
    const dy = y - cropStart.current.y;
    onStateUpdate({
      cropBox: {
        ...cropBox,
        x: cropStart.current.cropX + dx,
        y: cropStart.current.cropY + dy,
      }
    });
  };

  const handleMouseUp = () => {
    onStateUpdate({ isDraggingCrop: false });
    cropStart.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto max-h-[500px] border border-gray-300 rounded-lg cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}