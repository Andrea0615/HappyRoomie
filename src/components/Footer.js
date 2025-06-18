import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black pt-16 pb-8"> {/* Fondo negro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img
                className="h-10 w-auto"
                src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0NRN2FAd8ASzOYnuUx9evHl1k3cs0iWKGPRJ7" // Nueva imagen para el logo en el footer
                alt="Happy Rommie"
              />
            </div>
            <p className="text-gray-300 mb-4"> {/* Texto gris claro para contraste */}
              Conectamos estudiantes foráneos del Tec de Monterrey con las mejores opciones de vivienda y roomies compatibles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#FFDC30]"> {/* Iconos gris claro */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FFDC30]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FFDC30]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Enlaces rápidos</h3> {/* Texto blanco */}
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Inicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Buscar propiedades</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Publicar propiedad</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Encontrar roomie</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Campus</h3> {/* Texto blanco */}
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Monterrey</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Ciudad de México</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Guadalajara</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Puebla</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFDC30]">Querétaro</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contacto</h3> {/* Texto blanco */}
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-[#FFDC30] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300">info@happyrommie.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-[#FFDC30] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">(81) 1234-5678</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-[#FFDC30] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300">Av. Eugenio Garza Sada 2501 Sur, Tecnológico, 64849 Monterrey, N.L.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8"> {/* Borde gris oscuro */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0"> {/* Texto gris claro */}
              © {new Date().getFullYear()} Happy Rommie. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-[#FFDC30] text-sm">Términos y condiciones</a>
              <a href="#" className="text-gray-300 hover:text-[#FFDC30] text-sm">Política de privacidad</a>
              <a href="#" className="text-gray-300 hover:text-[#FFDC30] text-sm">Ayuda</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// DONE