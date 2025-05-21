export default async function generateAndDownloadIco(favicons, getToken) {
  try {
    const requiredSizes = ['16x16', '32x32', '48x48', '64x64'];
    const missingSizes = requiredSizes.filter(size => !favicons[size]);
    
    if (missingSizes.length > 0) {
      throw new Error(`Faltan tamaños requeridos: ${missingSizes.join(', ')}`);
    }

    const formData = new FormData();
    requiredSizes.forEach(size => {
      const blob = dataURLToBlob(favicons[size]);
      formData.append('images', blob, `icon-${size}.png`);
    });

    const token = await getToken();
    if (!token) {
      throw new Error('No se pudo obtener el token de autenticación');
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ico/generate-ico`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error en el servidor');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favicon.ico';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    ;
    throw error;
  }
}

function dataURLToBlob(dataURL) {
  const parts = dataURL.split(',');
  const byteString = atob(parts[1]);
  const mimeString = parts[0].match(/:(.*?);/)[1];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: mimeString });
}