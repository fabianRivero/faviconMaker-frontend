import React from 'react';

const FaviconPreview = ({ faviconUrl, previewImage }) => {
  const displayUrl = previewImage || faviconUrl;

  const APPS = [
    { icon: "/chrome.svg", name: "Chrome" },
    { icon: "/google-drive.svg", name: "Drive" },
    { icon: "/maps.svg", name: "Maps" },
    { icon: "/gmail.svg", name: "Gmail" },
    { icon: "/youtube.svg", name: "YouTube" },
    { icon: "/github.svg", name: "GitHub" },
    { icon: "/brave.svg", name: "Brave" },
    { icon: "/sms.svg", name: "SMS" }
  ];

  const GRID_SIZE = 9;
  const FAVICON_POSITION = 4;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-800">Previsualización</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-white rounded-t-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="flex items-center bg-gray-100 px-3 py-2 border-b border-gray-200">
              <div className="flex space-x-2 mr-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-white rounded-full px-4 py-1 flex items-center border border-gray-300">
                {displayUrl && (
                  <img 
                    src={displayUrl} 
                    alt="Favicon" 
                    className="w-4 h-4 mr-2 object-contain"
                  />
                )}
                <span className="text-sm text-gray-600 truncate">www.tusitio.com</span>
              </div>
            </div>
            <div className="h-24 bg-white p-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Contenido de la página web</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Vista en navegador</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: GRID_SIZE }).map((_, index) => {
                if (index === FAVICON_POSITION && displayUrl) {
                  return (
                    <div key="favicon-app" className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <img 
                          src={displayUrl} 
                          alt="App icon" 
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <p className="text-[9px] text-gray-600 mt-1">Tu App</p>
                    </div>
                  );
                }
                
                const appIndex = index < FAVICON_POSITION ? index : index - 1;
                const app = APPS[appIndex % APPS.length];
                
                return (
                  <div key={`app-${index}`} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <img 
                        src={app.icon} 
                        alt={app.name} 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <p className="text-[9px] text-gray-600 mt-1">{app.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Vista en móvil</p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6">
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center shadow-inner">
            {displayUrl ? (
              <img
                src={displayUrl}
                alt="Vista previa"
                className="max-w-full max-h-full object-contain p-1"
              />
            ) : (
              <span className="text-gray-400 text-xs">Previsualización</span>
            )}
          </div>
          {previewImage && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              Editando
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {previewImage ? "Vista previa de edición" : "Vista directa"}
        </p>
      </div>
    </div>
  );
};

export default FaviconPreview;