export default function generateMetaHTML(faviconMap, borderRadius) {
  const linkTags = Object.keys(faviconMap)
    .map(size => {
      return `<link rel="icon" type="image/png" sizes="${size}" href="${faviconMap[size]}">`;
    })
    .join("\n");

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Vista previa del favicon</title>
  ${linkTags}
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
    }
    .preview {
      margin-top: 2rem;
    }
    .preview img {
      width: 64px;
      height: 64px;
      border-radius: ${borderRadius}px;
      border: 1px solid #ccc;
      padding: 4px;
    }
  </style>
</head>
<body>
  <h1>Vista previa del favicon</h1>
  <p>Este archivo contiene los enlaces necesarios para usar los favicons en tu sitio web.</p>
  <div class="preview">
    <img src="${faviconMap["64x64.png"]}" alt="favicon">
  </div>
</body>
</html>
`;
}
