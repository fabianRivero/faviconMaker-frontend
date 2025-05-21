import { useState, useCallback } from "react";

export default function ImageUpload({ onImageLoaded }) {
  const [dragging, setDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const isValidImage = (file) => {
    return file && file.type.startsWith('image/') && file.size < 5 * 1024 * 1024;
  };

  const handleFile = useCallback((file) => {
    setUploadError(null);
    if (!isValidImage(file)) {
      setUploadError('Por favor sube una imagen válida (máx. 5MB)');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const maxSize = 256;
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height)); 

      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const processedImg = new Image();
      processedImg.onload = () => {
        onImageLoaded(processedImg, canvas.toDataURL());
        URL.revokeObjectURL(url);
      };
      processedImg.src = canvas.toDataURL();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setUploadError("Error al cargar la imagen");
    };
    img.src = url;
  }, [onImageLoaded]);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Sube tu imagen</h2>
      
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          dragging 
            ? "border-indigo-500 bg-indigo-50/50" 
            : "border-gray-300 hover:border-indigo-300 hover:bg-indigo-50/30"
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-indigo-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          <p className="text-gray-700 font-medium">
            Arrastra y suelta tu imagen aquí
          </p>
          <p className="text-sm text-gray-500">
            Formatos soportados: JPG, PNG, SVG (máx. 5MB)
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center space-y-3">
        <div className="relative w-full">
          <label className="w-full">
            <span className="sr-only">Seleccionar archivo</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg shadow-sm transition-colors cursor-pointer">
              Seleccionar archivo
            </div>
          </label>
        </div>
        
        <p className="text-sm text-gray-500">
          O haz clic para buscar en tu dispositivo
        </p>
      </div>

      {uploadError && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
          {uploadError}
        </div>
      )}
    </div>
  );
}