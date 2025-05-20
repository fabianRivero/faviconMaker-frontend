import JSZip from "jszip";
import generateMetaHTML from "./generateMetaHTML";
import { saveAs } from "file-saver";
import generateFaviconSizes from "./generateFaviconSizes";

export default async function exportFaviconsZip(image, cropBox, offset, zoom, filter, borderRadius) {
    const favicons = generateFaviconSizes(image, cropBox, offset, zoom, filter, borderRadius);
    const zip = new JSZip();

    const htmlContent = generateMetaHTML(favicons, borderRadius);
    zip.file("favicon.html", htmlContent);

    for (const [filename, dataUrl] of Object.entries(favicons)) {

        const blob = dataURLToBlob(dataUrl);
        const pngFilename = filename.endsWith('.png') ? filename : `${filename}.png`;
        zip.file(pngFilename, blob);
    }

    const manifest = JSON.stringify({
        name: "Mi Sitio Web",
        short_name: "FaviconApp",
        icons: [
            { src: "64x64.png", sizes: "64x64", type: "image/png" },
            { src: "128x128.png", sizes: "128x128", type: "image/png" },
            { src: "256x256.png", sizes: "256x256", type: "image/png" }
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone"
    }, null, 2);
    zip.file("manifest.json", manifest);

    const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="128x128.png"/>
      <square150x150logo src="256x256.png"/>
      <TileColor>#ffffff</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
    zip.file("browserconfig.xml", browserconfig);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "favicons.zip");
}

function dataURLToBlob(dataURL) {
  const parts = dataURL.split(',');
  const byteString = atob(parts[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: "image/png" });
}