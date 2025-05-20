import { useState, useEffect } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import FaviconEditor from "../FaviconEditor/FaviconEditor";
import AIFaviconGenerator from "../AiFaviconGenerator/AiFaviconGenerator";
import { useUser } from '@clerk/clerk-react';
import { useLocation } from "react-router-dom"; 
import { toast } from "react-toastify";

export default function Editor({ onImageUploaded, generatedImage, resetImages }) {
  const [step, setStep] = useState("upload");
  const [imageData, setImageData] = useState({ img: null, url: null, source: null });
  const location = useLocation();
  const { user } = useUser();
  const [editorConfig, setEditorConfig] = useState(null);

  useEffect(() => {
    if (location.state?.imageSrc) {
      const img = new Image();
      img.onload = () => {
        setImageData({ img, url: location.state.imageSrc, source: 'state' });
        setStep("edit");
        onImageUploaded();
        
        if (location.state?.config) {
          setEditorConfig(location.state.config);
        }
      };
      img.src = location.state.imageSrc;
    }
  }, [location.state, onImageUploaded]);

  useEffect(() => {
    if (generatedImage) {
      setImageData({
        img: generatedImage.img,
        url: generatedImage.url,
        source: 'generated'
      });
      setStep("edit");
    }
  }, [generatedImage]);

  const handleImageUploaded = (file, img, url) => {
    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
   
    if (file?.size > MAX_SIZE_BYTES) {
      toast.error(`La imagen supera el límite de ${MAX_SIZE_MB}MB (Tamaño: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
      return;
    }
    
    setImageData({ img, url, source: 'upload' });
    setStep("edit");
    onImageUploaded();
  };

  const handleReset = () => {
    setImageData({ img: null, url: null, source: null });
    setStep("upload");
    resetImages();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          ¡Hola, <span className="text-indigo-600">{user.firstName}!</span>
        </h1>
        <p className="text-gray-600 mt-1">Edita tu favicon personalizado</p>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setStep("upload")}
          className={`px-6 py-3 font-medium ${
            step === "upload" 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Subir Imagen
        </button>
        <button
          onClick={() => setStep("edit")}
          disabled={!imageData.img}
          className={`px-6 py-3 font-medium ${
            step === "edit" 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          } ${
            !imageData.img ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Editor
        </button>
      </div>

      <div>
        {step === "edit" && imageData.img && (
          <div className="mt-6">
            <FaviconEditor
              image={imageData.img}
              imageURL={imageData.url}
              initialConfig={editorConfig}
              goBack={handleReset}
              sourceType={imageData.source}
            />
          </div>
        )}

        {step === "upload" && (
          <div className="mt-6">
            <ImageUpload onImageLoaded={handleImageUploaded} />
          </div>
        )}

        {step === "upload" && !imageData.img && (
          <AIFaviconGenerator onImageLoaded={handleImageUploaded} />
        )}
      </div>
    </div>
  );
}