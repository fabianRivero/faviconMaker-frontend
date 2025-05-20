import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ImageCanvas from "./components/ImageCanvas/ImageCanvas";
import EditorControls from "./components/EditorControls/EditorControls";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import SaveDesignDialog from "./components/SaveDesignDialog/SaveDesignDialog";
import FaviconPreview from "./components/FaviconPreview/FaviconPreview";

export default function FaviconEditor({ image, imageURL, goBack: goBackProp, initialConfig, designId: propDesignId }) {
  const [editorState, setEditorState] = useState({
    cropBox: { x: 50, y: 50, size: 64 },
    brightness: 1,
    saturation: 1,
    blur: 0,
    invert: 0,
    zoom: 1,
    offset: { x: 0, y: 0 },
    borderRadius: 0,
    description: "",
    isDraggingCrop: false
  });
  
  const [appState, setAppState] = useState({
    loadedImage: null,
    saveMode: null,
    showSaveDialog: false,
    isSaving: false,
    designId: propDesignId || initialConfig?._id || null,
    editedImageUrl: null,
    previewImage: null
  });

  const canvasRef = useRef(null);
  const cropStart = useRef(null);
  const { getToken } = useAuth();
  const location = useLocation();
  const state = location.state || {};

    useEffect(() => {
    if (appState.loadedImage) {
      updatePreview();
    }
  }, [
      editorState.cropBox, 
      editorState.brightness,
      editorState.saturation,
      editorState.blur,
      editorState.invert,
      editorState.zoom,
      editorState.offset,
      editorState.borderRadius,
      appState.loadedImage
    ]);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        setAppState(prev => ({ 
          ...prev, 
          loadedImage: img,
          designId: state.designId || propDesignId || initialConfig?._id || null
        }));
        
        if (state.config || initialConfig) {
          const config = state.config || initialConfig;
          handleStateUpdate({
            brightness: config.brightness ?? 1,
            saturation: config.saturation ?? 1,
            blur: config.blur ?? 0,
            invert: config.invert ?? 0,
            zoom: config.zoom ?? 1,
            offset: config.offset ?? { x: 0, y: 0 },
            cropBox: config.cropBox ?? { x: 50, y: 50, size: 64 },
            borderRadius: config.borderRadius ?? 0,
            description: state.description || initialConfig?.description || ""
          });
        } else {
          resetInputs();
        }
      };
      img.src = image.src || image;
    }
  }, [image, initialConfig, state.config, state.designId, state.description]);

  useEffect(() => {
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  const handleStateUpdate = (updates) => {
    setEditorState(prev => ({ ...prev, ...updates }));
  };

  const updatePreview = () => {
    const preview = getFavicon();
    setAppState(prev => ({ ...prev, previewImage: preview }));
  };

  const resetInputs = () => {
    const config = state.config || initialConfig || {};
    handleStateUpdate({
      brightness: config.brightness ?? 1,
      saturation: config.saturation ?? 1,
      blur: config.blur ?? 0,
      invert: config.invert ?? 0,
      zoom: 1,
      offset: { x: 0, y: 0 },
      borderRadius: config.borderRadius ?? 0
    });
  };

  const handleGoBack = () => {
    setAppState(prev => ({ 
      ...prev, 
      loadedImage: null,
      designId: null
    }));
    handleStateUpdate({
      brightness: 1,
      saturation: 1,
      blur: 0,
      invert: 0,
      zoom: 1,
      offset: { x: 0, y: 0 },
      borderRadius: 0,
      description: ""
    });
    
    if (goBackProp) goBackProp();
  };

  const getFilterString = () => {
    const { brightness, saturation, blur, invert } = editorState;
    return `
      brightness(${brightness}) 
      saturate(${saturation}) 
      blur(${blur}px) 
      invert(${invert})
    `.trim();
  };

  const getFavicon = () => {
    const { loadedImage } = appState;
    const { cropBox, offset, zoom, borderRadius } = editorState;
    
    if (!loadedImage || !loadedImage.complete) {
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx.filter = getFilterString();
    
    ctx.beginPath();
    const r = borderRadius * (64 / cropBox.size);
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
    
    return canvas.toDataURL("image/png");
  };

  const handleSaveDesign = async (mode = 'new') => {
    const { loadedImage, designId } = appState;
    const { description, zoom, offset, cropBox, brightness, saturation, blur, invert, borderRadius } = editorState;
    
    if (!loadedImage) {
      toast.error("No hay imagen para guardar");
      return;
    }
    
    setAppState(prev => ({ ...prev, isSaving: true }));
    
    try {
      const editedImage = getFavicon();
      if (!editedImage) throw new Error("No se pudo generar el favicon");

      const payload = {
        imageUrl: editedImage,
        originalImage: loadedImage.src,
        description,
        config: {
          zoom,
          offset,
          cropBox,
          brightness,
          saturation,
          blur,
          invert,
          borderRadius,
        },
      };

      const token = await getToken();
      let response;

      if (mode === 'overwrite' && designId) {
        response = await fetch(`${import.meta.env.BACKEND_URL}/api/designs/${designId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`${import.meta.env.BACKEND_URL}/api/designs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Error al guardar');
      }

      const data = await response.json();
      toast.success(mode === 'overwrite' ? 'Diseño actualizado' : 'Nuevo diseño guardado');
      
      setAppState(prev => ({
        ...prev,
        showSaveDialog: false,
        designId: mode === 'overwrite' ? designId : data._id,
        editedImageUrl: editedImage
      }));
      
    } catch (error) {
      toast.error(error.message || 'Error al guardar el diseño');
    } finally {
      setAppState(prev => ({ ...prev, isSaving: false }));
    }
  };

    return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Editor de Favicon</h2>
        <p className="text-gray-600 mt-1">Ajusta los parámetros para personalizar tu favicon</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-inner min-h-[400px]">
            <ImageCanvas
              canvasRef={canvasRef}
              editorState={editorState}
              appState={appState}
              onStateUpdate={handleStateUpdate}
              cropStart={cropStart}
            />
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <FaviconPreview 
              faviconUrl={appState.editedImageUrl || getFavicon()} 
              previewImage={appState.previewImage}
            />
          </div>
        </div>
        
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <EditorControls 
              editorState={editorState} 
              onStateUpdate={handleStateUpdate} 
            />
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <ActionButtons
              editorState={editorState}
              appState={appState}
              onStateUpdate={handleStateUpdate}
              onAppStateUpdate={updates => setAppState(prev => ({ ...prev, ...updates }))}
              loadedImage={appState.loadedImage}
              getToken={getToken}
              resetInputs={resetInputs}
              handleGoBack={handleGoBack}
              handleSaveDesign={handleSaveDesign}
            />
          </div>
        </div>
      </div>

      {appState.showSaveDialog && (
        <SaveDesignDialog
          appState={appState}
          onAppStateUpdate={updates => setAppState(prev => ({ ...prev, ...updates }))}
          handleSaveDesign={handleSaveDesign}
        />
      )}
    </div>
  );
}
