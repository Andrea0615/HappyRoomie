import React from 'react';

const PropertyOwnerFooter = () => {
  const handleLinkClick = (section) => {
    alert(`Navegando a la sección: ${section}`);
  };

  return (
    <footer className="bg-black text-white py-10 px-4 font-['Poppins']">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Logo y descripción */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-3">
            <img src="/logo-happy-roomie.png" alt="Happy Roomie Logo" className="h-12" />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed font-['Poppins']">
            La plataforma exclusiva para estudiantes del Tec de Monterrey que buscan el lugar perfecto para vivir y los compañeros ideales.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-[#ffd662] mb-4 font-['Poppins']">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => handleLinkClick('Preguntas Frecuentes')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-['Poppins']"
              >
                Preguntas Frecuentes
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('Cómo Funciona')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-['Poppins']"
              >
                Cómo Funciona
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('Términos y Condiciones')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-['Poppins']"
              >
                Términos y Condiciones
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick('Política de Privacidad')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-['Poppins']"
              >
                Política de Privacidad
              </button>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contáctanos */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-[#ffd662] mb-4 font-['Poppins']">Contáctanos</h3>
          <p className="text-gray-300 text-sm mb-2 font-['Poppins']">
            Email: <a href="mailto:happyroomiemx@gmail.com" className="hover:text-white transition-colors">happyroomiemx@gmail.com</a>
          </p>
          <p className="text-gray-300 text-sm font-['Poppins']">
            Teléfono: <a href="tel:+523313043712" className="hover:text-white transition-colors">(33) 1304-3712</a>
          </p>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-xs font-['Poppins']">
        © {new Date().getFullYear()} Happy Roomie. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default PropertyOwnerFooter; 