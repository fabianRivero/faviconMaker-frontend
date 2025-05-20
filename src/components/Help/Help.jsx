import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const HelpSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTutorial, setActiveTutorial] = useState(null);

  const tutorialCategories = [
    {
      id: 'getting-started',
      title: 'Primeros Pasos',
      icon: '🚀',
      tutorials: [
        {
          id: 'what-is-favicon',
          title: '¿Qué es un favicon y por qué es crucial para tu sitio web?',
          content: (
            <div className="pl-2 text-gray-600 space-y-3">
              <p>Un favicon es un elemento esencial de identidad digital que aparece en diferentes contextos:</p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Pestañas del navegador:</strong> Ayuda a los usuarios a identificar tu sitio entre múltiples pestañas abiertas.</li>
                <li><strong>Marcadores/favoritos:</strong> Mejora el reconocimiento cuando los usuarios guardan tu sitio en sus favoritos.</li>
                <li><strong>Resultados de búsqueda:</strong> En algunos motores de búsqueda, aparece junto a tu URL, aumentando la visibilidad.</li>
                <li><strong>Barras de título y apps móviles:</strong> Cuando los usuarios añaden tu sitio a la pantalla de inicio.</li>
                <li><strong>Historial de navegación:</strong> Facilita el reconocimiento visual en la lista de sitios visitados.</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Impacto profesional:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Branding consistente:</strong> Refuerza tu identidad visual en todos los puntos de contacto digital.</li>
                  <li><strong>Credibilidad:</strong> Sitios sin favicon son percibidos como menos profesionales o confiables.</li>
                  <li><strong>Experiencia de usuario:</strong> Reduce la fricción en la navegación multitarea.</li>
                  <li><strong>Conversión:</strong> En entornos con muchas pestañas abiertas (como comercio electrónico), ayuda a los usuarios a volver a tu sitio.</li>
                </ul>
              </div>
            </div>
          )
        },
        {
          id: 'why-ico',
          title: 'Formatos de favicon: ¿ICO, PNG o SVG?',
          content: (
            <div className="pl-2 text-gray-600 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Formato .ICO (Recomendado)</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Compatibilidad universal:</strong> Único formato nativamente soportado por todas las versiones de Internet Explorer, Edge, Chrome, Firefox y Safari.</li>
                  <li><strong>Múltiples resoluciones:</strong> Puede contener versiones de 16x16, 32x32, 48x48 y 64x64 píxeles en un solo archivo.</li>
                  <li><strong>Soporte para transparencia:</strong> Permite fondos transparentes como PNG pero con mejor soporte en navegadores antiguos.</li>
                  <li><strong>Requerimiento para Windows:</strong> Necesario para que tu icono aparezca correctamente en accesos directos del escritorio.</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-semibold text-yellow-800 mb-2">Comparativa de formatos:</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Formato</th>
                      <th className="text-left py-2">Ventajas</th>
                      <th className="text-left py-2">Limitaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">ICO</td>
                      <td>Máxima compatibilidad, múltiples tamaños</td>
                      <td>Mayor tamaño de archivo</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">PNG</td>
                      <td>Calidad en alta resolución, transparencia</td>
                      <td>No soporta múltiples resoluciones</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">SVG</td>
                      <td>Escalable infinitamente, pequeño tamaño</td>
                      <td>Soporte limitado en navegadores antiguos</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-3 text-sm text-yellow-700">Recomendación: Usa ICO como formato principal y PNG/SVG como complemento para dispositivos modernos.</p>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'tutorials',
      title: 'Tutoriales Paso a Paso',
      icon: '📚',
      tutorials: [
        {
          id: 'create-favicon',
          title: 'Creación de Favicons desde Cero',
          content: (
            <div className="pl-2 text-gray-600 space-y-6">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h4 className="font-semibold text-indigo-800 mb-3">Requisitos Previos</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Imagen base:</strong> PNG (mínimo 256x256px), JPG (alta calidad) o SVG (vectorial).</li>
                  <li><strong>Cuenta gratuita:</strong> Para guardar tus diseños en el historial.</li>
                  <li><strong>Navegador actualizado:</strong> Chrome, Firefox o Edge recomendados.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">1</span>
                  Subida de Imagen
                </h4>
                <div className="ml-8 space-y-2">
                  <p><strong>Opciones avanzadas:</strong></p>
                  <ul className="list-[circle] pl-5 space-y-2">
                    <li><strong>Desde tu computadora:</strong> Arrastra y suelta o haz clic para explorar archivos.</li>
                    <li><strong>Generación con IA:</strong> Usa nuestro botón "Crear con Inteligencia Artificial" para generar imagenes y usarolas en el editor.</li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded-md text-sm mt-2">
                    <p className="text-blue-800 font-medium">💡 Consejo profesional:</p>
                    <p>Para mejores resultados, usa imágenes con fondo transparente (PNG-24 o SVG).</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">2</span>
                  Edición y Recorte
                </h4>
                <div className="ml-8 space-y-3">
                  <ul className="list-[circle] pl-5 space-y-2">
                    <li>
                      <strong>Área de recorte:</strong>
                      <ul className="list-[square] pl-5 mt-1 space-y-1">
                        <li>El área roja muestra la zona que se convertirá en favicon.</li>
                        <li>Puedes ajustar el zoom (+/-) para mayor precisión.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Herramientas de edición:</strong>
                      <ul className="list-[square] pl-5 mt-1 space-y-1">
                        <li>Brillo/Contraste.</li>
                        <li>Saturación.</li>
                        <li>Nitidez.</li>
                      </ul>
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-green-50 p-3 rounded-md border border-green-100">
                      <p className="text-green-800 font-medium text-sm">✅ Correcto</p>
                      <p className="text-xs mt-1">Recortar centrado en el elemento principal con espacio respirable</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-md border border-red-100">
                      <p className="text-red-800 font-medium text-sm">❌ Evitar</p>
                      <p className="text-xs mt-1">Dejar mucho espacio vacío o cortar partes esenciales del diseño</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">3</span>
                  Descarga e Implementación
                </h4>
                <div className="ml-8 space-y-3">
                  <ul className="list-[circle] pl-5 space-y-2">
                    <li>
                      <strong>Formatos disponibles:</strong>
                      <ul className="list-[square] pl-5 mt-1 space-y-1">
                        <li><strong>.ICO:</strong> Para compatibilidad universal (incluye múltiples resoluciones)</li>
                        <li><strong>.PNG:</strong> Alta calidad para dispositivos modernos</li>
                        <li><strong>.SVG:</strong> Versión vectorial escalable (nuevos navegadores)</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
      
      ]
    },
      {
      id: 'best-practices',
      title: 'Mejores Prácticas',
      icon: '🏆',
      tutorials: [
        {
          id: 'design-tips',
          title: 'Diseño de favicons: Principios avanzados',
          content: (
            <div className="pl-2 text-gray-600 space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-800 mb-3">Principios fundamentales:</h4>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong>Simplicidad reconocible:</strong>
                    <ul className="list-[circle] pl-5 mt-1 space-y-1">
                      <li>El 90% de los favicons efectivos usan 1-2 elementos visuales máximo.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Contraste visual:</strong>
                    <ul className="list-[circle] pl-5 mt-1 space-y-1">
                      <li>Usa colores que contrasten con fondos blancos/oscuros.</li>
                      <li>Evita tonos pasteles o gamas muy similares.</li>
                      <li>Prueba tu favicon en modo claro y oscuro.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Legibilidad en 16px:</strong>
                    <ul className="list-[circle] pl-5 mt-1 space-y-1">
                      <li>Evitar usar texto (a menos que sea una letra muy distintiva).</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-2">Errores comunes:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Usar imágenes complejas que se vuelven ilegibles.</li>
                  <li>Olvidar probar en diferentes fondos y tamaños.</li>
                  <li>Usar formatos no optimizados que aumentan el tiempo de carga.</li>
                </ul>
              </div>
            </div>
          )
        },
        {
          id: 'technical-implementation',
          title: 'Implementación técnica óptima',
          content: (
            <div className="pl-2 text-gray-600 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Código HTML recomendado:</h4>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                  {`<!-- Favicon básico -->
  <link rel="icon" href="/favicon.ico" sizes="any">

  <!-- Para dispositivos modernos -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Configuración recomendada para múltiples resoluciones -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`}
                </pre>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-800 mb-2">Optimización avanzada:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Preload:</strong> Considera usar <code>&lt;link rel="preload"&gt;</code> para cargas más rápidas.</li>
                  <li><strong>Fallbacks:</strong> Siempre incluye un favicon.ico en la raíz del sitio para navegadores antiguos.</li>
                </ul>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    setActiveTutorial(null);
  };

  const toggleTutorial = (tutorialId) => {
    setActiveTutorial(activeTutorial === tutorialId ? null : tutorialId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Centro de Ayuda</h1>
      
      <div className="space-y-4">
        {tutorialCategories.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{category.icon}</span>
                <h2 className="font-semibold text-gray-800">{category.title}</h2>
              </div>
              {activeCategory === category.id ? (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {activeCategory === category.id && (
              <div className="p-4 space-y-3">
                {category.tutorials.map((tutorial) => (
                  <div key={tutorial.id} className="border-l-2 border-indigo-200 pl-4">
                    <button
                      onClick={() => toggleTutorial(tutorial.id)}
                      className="w-full text-left flex justify-between items-start"
                    >
                      <h3 className="font-medium text-indigo-600 hover:text-indigo-800">
                        {tutorial.title}
                      </h3>
                      {activeTutorial === tutorial.id ? (
                        <ChevronDownIcon className="h-4 w-4 text-gray-500 mt-1" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4 text-gray-500 mt-1" />
                      )}
                    </button>

                    {activeTutorial === tutorial.id && (
                      <div className="mt-2 pl-2 text-gray-600">
                        {tutorial.content ? (
                          tutorial.content
                        ) : tutorial.steps ? (
                          <ol className="list-decimal pl-5 space-y-2">
                            {tutorial.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        ) : (
                          <ul className="list-disc pl-5 space-y-2">
                            {tutorial.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSection;