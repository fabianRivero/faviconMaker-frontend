import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import Header from '../Header/Header';
import FeaturesSlider from '../FeaturesSlider';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280); 
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Header />
      
      <div className='container mx-auto px-4 h-full xl:grid xl:grid-cols-[1fr_1fr] xl:gap-11'>
        <div className='flex flex-col justify-center py-20 gap-6 xl:ml-[50px] xl:mt-[10vh] xxl:mt-[15vh]'>
          <h1 className='text-4xl md:text-[45px] font-bold text-gray-900 leading-tight'>
            Convierte cualquier imagen en un favicon <span className='text-indigo-600'>fácilmente</span>
          </h1>
          
          <p className='text-lg text-gray-600 mt-4 max-w-lg'>
            Transforma tus imágenes en favicons profesionales en segundos. 
            Perfecto para desarrolladores y diseñadores.
          </p>

          <div className='mt-8'>
            <p className='text-gray-500 mb-4'>¡Regístrate para probarlo!</p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <SignInButton mode='modal'>
                  <button className="bg-white hover:bg-gray-50 text-indigo-600 font-medium py-3 px-6 rounded-lg border border-indigo-200 shadow-sm transition-all hover:shadow-md">
                    Iniciar Sesión
                  </button>
                </SignInButton>
                <SignUpButton mode='modal'>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all hover:shadow-md">
                    Regístrate Gratis
                  </button>
                </SignUpButton>
              </div>
          </div>
        </div>
        
        {!isMobile && (
          <div className='hidden xl:flex items-center justify-center relative mt-10 mr-5'>
            <FeaturesSlider />
          </div>
        )}
      </div>

    </div>
  );
}