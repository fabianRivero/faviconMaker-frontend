export default function SaveDesignDialog({
  appState,
  onAppStateUpdate,
  handleSaveDesign
}) {
  const { isSaving } = appState;

  const handleClose = () => {
    onAppStateUpdate({ showSaveDialog: false });
  };

  const handleOverwrite = async () => {
    await handleSaveDesign('overwrite');
    handleClose();
  };

  const handleNew = async () => {
    await handleSaveDesign('new');
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">¿Cómo quieres guardar?</h3>
        <div className="space-y-3">
          <button 
            onClick={handleOverwrite}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg">
            {isSaving ? 'Guardando...' : 'Sobreescribir diseño actual'}
          </button>

          <button 
            disabled={isSaving}
            onClick={handleNew}
            className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-medium py-2 px-4 rounded-lg border border-indigo-200">
            {isSaving ? 'Guardando...' : 'Crear nuevo diseño'}
          </button>

          <button 
            onClick={handleClose}
            className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}