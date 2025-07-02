import React, { useState } from 'react';
import RegistrationModal from './RegistrationModal';

const Navbar = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegistrationClick = () => {
    setIsRegistrationModalOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const handleRegistrationOption = (option) => {
    setIsRegistrationModalOpen(false);
    if (option === 'estudiante') {
      onNavigate('dashboard'); // Navigate to student registration form
    } else if (option === 'rentar') {
      // Navigate to property owner registration form
      onNavigate('propertyOwnerRegistration', null, null, 'propertyOwner');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <img
                className="h-16 w-auto" // Ajusta el tamaño según sea necesario
                src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0xBU97eawB9QM6ZyvCAYlu4dSEThWpbaxnVFO" // Nuevo logo PNG
                alt="Happy Rommie Logo"
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#" 
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 text-black hover:bg-yellow-100 rounded-md font-medium ${currentPage === 'home' ? 'bg-yellow-100' : ''}`}
            >
              Inicio
            </a>
            <a 
              href="#" 
              onClick={() => onNavigate('search')}
              className={`px-3 py-2 text-black hover:bg-yellow-100 rounded-md font-medium ${currentPage === 'search' ? 'bg-yellow-100' : ''}`}
            >
              Buscar propiedades
            </a>
            <a href="#" className="px-3 py-2 text-black hover:bg-yellow-100 rounded-md font-medium">Contacto</a>
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-2 text-black hover:bg-yellow-100 rounded-md font-medium ${currentPage === 'dashboard' ? 'bg-yellow-100' : ''}`}
            >
              Mi Perfil
            </button>
            <button 
              onClick={handleRegistrationClick}
              className="px-4 py-2 border-2 border-[#FFDC30] text-black rounded-md font-bold hover:bg-yellow-100 transition duration-300"
            >
              Registrarse
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-yellow-100"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a 
              href="#" 
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className={`block px-3 py-2 text-black hover:bg-yellow-100 rounded-md font-medium ${currentPage === 'home' ? 'bg-yellow-100' : ''}`}
            >
              Inicio
            </a>
            <a 
              href="#" 
              onClick={() => {
                onNavigate('search');
                setIsMenuOpen(false);
              }}
              className={`block px-3 py-2 text-black hover:bg-yellow-100 rounded-md font-medium ${currentPage === 'search' ? 'bg-yellow-100' : ''}`}
            >
              Buscar propiedades
            </a>
            <a href="#" className="block px-3 py-2 text-black hover:bg-yellow-100 rounded-md font-medium">Contacto</a>
            <button 
              onClick={() => {
                onNavigate('dashboard');
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-black hover:bg-yellow-100 rounded-md font-medium ${currentPage === 'dashboard' ? 'bg-yellow-100' : ''}`}
            >
              Mi Perfil
            </button>
            <button 
              onClick={handleRegistrationClick}
              className="mt-2 w-full px-4 py-2 border-2 border-[#FFDC30] text-black rounded-md font-bold hover:bg-yellow-100 transition duration-300"
            >
              Registrarse
            </button>
          </div>
        </div>
      )}
      
      <RegistrationModal 
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onOptionSelect={handleRegistrationOption}
      />
    </nav>
  );
};

export default Navbar;

// DONE