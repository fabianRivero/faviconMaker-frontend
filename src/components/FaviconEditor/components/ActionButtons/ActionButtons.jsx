import { toast } from "react-toastify";
import exportFaviconsZip from "../../../faviconGenerationUtils/exportFaviconsZip";
import generateAndDownloadIco from "../../../faviconGenerationUtils/generateAndDownloadIco";
import generateAndDownloadSvg from "../../../faviconGenerationUtils/generateAndDownloadSvg"; 
import generateFaviconSizes from "../../../faviconGenerationUtils/generateFaviconSizes";

export default function ActionButtons({
  editorState,
  appState,
  onStateUpdate,
  onAppStateUpdate,
  loadedImage,
  getToken,
  resetInputs,
  handleGoBack,
  handleSaveDesign
}) {
  const { description, cropBox, offset, zoom, brightness, saturation, blur, invert, borderRadius } = editorState;
  const { isSaving, designId } = appState;

  const handleDownloadIco = async () => {
    try {
      if (!loadedImage) {
        toast.error("No hay imagen cargada");
        return;
      }

      const favicons = generateFaviconSizes(
        loadedImage, 
        cropBox, 
        offset, 
        zoom, 
        { brightness, saturation, blur, invert }
      );

      await generateAndDownloadIco(favicons, getToken);
      toast.success("ICO descargado correctamente");
    } catch (error) {
      toast.error(error.message || "Error al descargar el archivo ICO");
    }
  };

  const handleDownloadSvg = async () => {
    try {
      if (!loadedImage) {
        toast.error("No hay imagen cargada");
        return;
      }

      await generateAndDownloadSvg(
        loadedImage,
        cropBox,
        offset,
        zoom,
        { 
          brightness: editorState.brightness, 
          saturation: editorState.saturation, 
          blur: editorState.blur, 
          invert: editorState.invert 
        },
        editorState.borderRadius
      );
      
      toast.success("SVG descargado correctamente");
    } catch (error) {
      toast.error(error.message || "Error al descargar el archivo SVG");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={resetInputs}
          className="bg-white hover:bg-gray-50 text-indigo-600 font-medium py-2 px-4 rounded-lg border border-indigo-200 shadow-sm transition-all hover:shadow-md"
        >
          Reiniciar ajustes
        </button>

        <button
          onClick={() => {
            if (!loadedImage) {
              toast.error("No hay imagen cargada");
              return;
            }
            exportFaviconsZip(
              loadedImage, 
              cropBox, 
              offset, 
              zoom, 
              { brightness, saturation, blur, invert }, 
              borderRadius
            );
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all hover:shadow-md"
        >
          Descargar .zip
        </button>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
      <textarea
        value={description}
        onChange={(e) => onStateUpdate({ description: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
        rows="3"
        placeholder="Describe tu diseño..."
      />

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGoBack}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all hover:shadow-md"
        >
          Volver
        </button>

        <button
          onClick={handleDownloadIco}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all hover:shadow-md"
        >
          Descargar .ico
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDownloadSvg}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all hover:shadow-md"
        >
          Descargar .svg
        </button>

        <button
          disabled={isSaving}
          onClick={() => {
            if (designId) {
              onAppStateUpdate({ showSaveDialog: true });
            } else {
              handleSaveDesign('new');
            }
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all hover:shadow-md"
        >
          {isSaving ? 'Guardando...' : (designId ? 'Guardar Cambios' : 'Guardar Diseño')}
        </button>
      </div>
    </div>
  );
}