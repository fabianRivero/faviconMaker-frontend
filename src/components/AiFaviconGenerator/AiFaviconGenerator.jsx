import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

export default function AIFaviconGenerator({ onImageLoaded }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const handleGenerateWithAI = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor ingresa una descripción para el favicon");
      return;
    }

    setLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/generate-ai-favicon`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ prompt }),
        credentials: "include",
         mode: "cors" 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Error al generar el favicon con IA");
      }

    const data = await response.json(); 
        console.log("Data recibida:", data);

      const fullImageUrl = data.urls.png.startsWith('http') 
      ? data.urls.png 
      : `${import.meta.env.VITE_BACKEND_URL}${data.urls.png}`;

    setImageUrl(fullImageUrl); 
    toast.success("Favicon generado con éxito!");

    } catch (error) {
      setError(error.message);
      toast.error(error.message || "Error al generar el favicon");
    } finally {
      setLoading(false);
    }
  };

  const handleUseInEditor = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      if (blob.size > 10 * 1024 * 1024) {
        toast.error("La imagen generada es demasiado grande (máximo 10MB)");
        return;
      }

      const img = new Image();
      
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const maxSize = 512;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((scaledBlob) => {
            if (!scaledBlob) {
              throw new Error("Error al redimensionar la imagen");
            }

            const file = new File([scaledBlob], "ai-favicon.png", { 
              type: "image/png",
              lastModified: Date.now()
            });

            const scaledUrl = URL.createObjectURL(scaledBlob);
            const scaledImg = new Image();
            
            scaledImg.onload = () => {
              onImageLoaded(file, scaledImg, scaledUrl);
              toast.success("Favicon listo para editar!");
            };
            
            scaledImg.onerror = () => {
              throw new Error("Error al cargar la imagen redimensionada");
            };
            
            scaledImg.src = scaledUrl;

          }, "image/png", 0.92);

        } catch (error) {
          toast.error(error.message || "Error al procesar la imagen");
        }
      };

      img.onerror = () => {
        throw new Error("Error al cargar la imagen generada");
      };

      img.src = URL.createObjectURL(blob);

    } catch (error) {
      toast.error(error.message || "Error al preparar el favicon para editar");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Generar Favicon con IA</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Describe el favicon que deseas
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: 'gato negro minimalista', 'logotipo de pizza'"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Sugerencia: Incluye palabras como "minimalista", "icono" o "favicon" para mejores resultados
          </p>
        </div>

        <button
          onClick={handleGenerateWithAI}
          disabled={loading || !prompt.trim()}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            loading || !prompt.trim() 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          } transition-colors w-full`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando...
            </span>
          ) : (
            "Generar con IA"
          )}
        </button>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">Resultado:</h3>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1 flex flex-col items-center">
                <img
                  src={imageUrl}
                  alt="Favicon generado por IA"
                  className="w-32 h-32 object-contain border border-gray-300 rounded-lg bg-white p-2"
                />
                <p className="text-sm text-gray-500 mt-2">Vista previa</p>
              </div>
              
              <div className="space-y-3 w-full md:w-auto">
                <button 
                  onClick={handleUseInEditor}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full transition-colors"
                >
                  Usar en Editor
                </button>
                
                <a 
                  href={imageUrl} 
                  download="ai-favicon.ico"
                  className="block px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-center transition-colors"
                >
                  Descargar Favicon
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}