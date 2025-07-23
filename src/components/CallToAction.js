import React from 'react';

const CallToAction = ({ onNavigate }) => {
  return (
    <section className="py-16 bg-[#ffd662]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#0a2a5c] mb-4">¿Tienes una propiedad cerca del Tec?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Publica tu propiedad gratis y conecta con estudiantes verificados que buscan un lugar como el tuyo.
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#ffd662]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Publicación gratuita</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#ffd662]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Estudiantes verificados</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#ffd662]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Contratos seguros</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#ffd662]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Soporte personalizado</span>
                </li>
              </ul>
              <button 
                className="px-6 py-3 bg-[#ffd662] text-[#0a2a5c] rounded-md font-bold hover:bg-yellow-400 transition duration-300"
                onClick={() => onNavigate('propertyOwnerRegistration', null, null, 'propertyOwner')}
              >
                Publicar mi propiedad
              </button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80" 
                alt="Publica tu propiedad" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

// DONE