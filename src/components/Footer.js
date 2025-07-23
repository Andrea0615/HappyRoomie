import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0a2a5c] text-white py-10 px-4 font-['Poppins']">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Columna 1: Logo y descripción */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-3">
            <img src="/liviko-logo.png" alt="Liviko Logo" className="h-12" />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed font-['Poppins'] mb-4">
            Conectamos estudiantes foráneos del Tec de Monterrey con las mejores opciones de vivienda y roomies compatibles.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/happy.roomie.mx/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFDC30]">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="https://www.instagram.com/happy.roomie.mx/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFDC30]">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="https://www.tiktok.com/@happy.roomie.mx" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFDC30]">
              <i className="fab fa-tiktok text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Columna 2: Enlaces rápidos */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-[#FFDC30] mb-4 font-['Poppins']">Enlaces rápidos</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Inicio</a></li>
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Buscar propiedades</a></li>
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Publicar propiedad</a></li>
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Encontrar roomie</a></li>
          </ul>
        </div>

        {/* Columna 3: Campus */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-[#FFDC30] mb-4 font-['Poppins']">Campus</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Monterrey</a></li>
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Ciudad de México</a></li>
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Guadalajara</a></li>
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Puebla</a></li>
            <li><a href="#" className="text-white hover:text-[#FFDC30]">Querétaro</a></li>
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-[#FFDC30] mb-4 font-['Poppins']">Contacto</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-center md:justify-start">
              <span className="mr-2 text-[#FFDC30]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <span>happyroomiemx@gmail.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <span className="mr-2 text-[#FFDC30]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              <span>(81) 1234-5678</span>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <span className="mr-2 text-[#FFDC30]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <span>Av. Gral Ramón Corona No 2514, Colonia Nuevo México, 45201 Zapopan, Jal.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-xs font-['Poppins']">
        © {new Date().getFullYear()} Happy Roomie. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

// DONE