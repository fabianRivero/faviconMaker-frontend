import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturesSlider = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true); 
    return () => setIsReady(false);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    cssEase: 'ease-in-out',
  };

  const features = [
    {
      title: "Conversión Instantánea",
      description: "Transforma cualquier imagen a favicon en segundos con nuestro algoritmo de alta calidad",
      icon: "⚡",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Personalización Avanzada",
      description: "Ajusta brillo, contraste, saturación y más para obtener el resultado perfecto",
      icon: "🎨",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Exporta en múltiples formatos",
      description: "Descarga tu favicon en .ico, .png o .svg listo para usar en tu sitio web",
      icon: "📁",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Previsualización en tiempo real",
      description: "Ve los cambios al instante mientras ajustas los parámetros",
      icon: "👁️",
      color: "bg-amber-100 text-amber-600"
    }
  ];

  if (!isReady) return null;

  return (
    <div className="relative max-w-2xl mx-auto">
      <Slider {...settings}>
        {features.map((feature, index) => (
          <div key={index} className="px-2 py-4">
            <div className={`p-8 rounded-xl shadow-sm border border-gray-200 ${feature.color.replace('text', 'bg')} bg-opacity-20`}>
              <div className="flex flex-col items-center text-center">
                <div className={`text-5xl mb-6 p-4 rounded-full ${feature.color} bg-opacity-30`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                  {feature.description}
                </p>
                
                <div className="mt-8 w-full">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between">
                      
                    </div>
                    <div className="overflow-hidden h-2 mt-2 text-xs flex rounded bg-gray-200">
                      <div 
                        style={{ width: `${(index + 1) * 25}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${feature.color.replace('text', 'bg')}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturesSlider;