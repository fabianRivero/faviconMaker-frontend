import { useAuth, SignedIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

export default function History() {
  const { isSignedIn, getToken } = useAuth();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) fetchHistory();
  }, [isSignedIn]);

  const fetchHistory = async () => {
    setIsLoading(true); 
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/designs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteDesign = async (id) => {
    const token = await getToken();
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/designs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setHistory(history.filter((d) => d._id !== id));
  };

  const takeToEditor = (design) => {
    navigate("/editor", {
      state: {
        imageSrc: design.originalImage,
        config: {
          ...design.config,             
          cropBox: design.config.cropBox || { x: 50, y: 50, size: 64 }
        },
        designId: design._id,
        description: design.description,
      },
    });
  };

  const downloadImage = (imageUrl, type) => {
    saveAs(imageUrl, `favicon-${type}-${Date.now()}.png`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-10">
      <SignedIn>
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Historial de Diseños</h1>
          <p className="text-gray-600 mt-1">Tus favicons creados anteriormente</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex gap-6">
                  <div className="space-y-2">
                    <div className="h-20 w-20 bg-gray-200 rounded-lg"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 w-20 bg-gray-200 rounded-lg"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="h-9 bg-gray-200 rounded-lg w-20"></div>
                  <div className="h-9 bg-gray-200 rounded-lg w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">No tienes diseños guardados</p>
            <button 
              onClick={() => navigate("/editor")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Crear primer diseño
            </button>
          </div>
        ) : ( 
          <ul className="grid gap-4">
            {history.map((design) => (
              <li key={design._id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-600">
                      {new Date(design.updatedAt || design.createdAt).toLocaleString()}
                    </p>
                    <p className="text-md font-medium text-gray-800">
                      {design.description || "Sin descripción"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => takeToEditor(design)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteDesign(design._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-6 items-center mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Original</p>
                    <img 
                      src={design.originalImage} 
                      className="w-20 h-20 object-contain border border-gray-200 rounded-lg bg-white p-1"
                    />
                    <button
                      onClick={() => downloadImage(design.originalImage, 'original')}
                      className="mt-2 px-3 py-1 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-xs"
                    >
                      Descargar
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Editada</p>
                    <img 
                      src={design.imageUrl} 
                      className="w-20 h-20 object-contain border border-gray-200 rounded-lg bg-white p-1"
                    />
                    <button
                      onClick={() => downloadImage(design.imageUrl, 'editada')}
                      className="mt-2 px-3 py-1 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-xs"
                    >
                      Descargar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SignedIn>
    </div>
  );
}