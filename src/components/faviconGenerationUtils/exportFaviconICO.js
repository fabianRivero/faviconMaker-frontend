import { saveAs } from "file-saver";
import ico from "icojs";

export async function exportFaviconICO(image, cropBox, offset, zoom, filter, borderRadius) {
  const sizes = [16, 32, 48];
  const images = [];

  for (const size of sizes) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.filter = filter;
    const r = borderRadius * (size / cropBox.size);
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.quadraticCurveTo(size, 0, size, r);
    ctx.lineTo(size, size - r);
    ctx.quadraticCurveTo(size, size, size - r, size);
    ctx.lineTo(r, size);
    ctx.quadraticCurveTo(0, size, 0, size - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      image,
      (cropBox.x - offset.x) / zoom,
      (cropBox.y - offset.y) / zoom,
      cropBox.size / zoom,
      cropBox.size / zoom,
      0,
      0,
      size,
      size
    );

    const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
    const buffer = await blob.arrayBuffer();
    images.push({ buffer, width: size, height: size });
  }

  const icoArrayBuffer = await ico.encode(images, { bitDepth: 32 });
  const blob = new Blob([icoArrayBuffer], { type: "image/x-icon" });
  saveAs(blob, "favicon.ico");
}
