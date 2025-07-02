import React from 'react';

const PropertyOwnerHeader = () => {
  return (
    <div className="w-full bg-[#FFDC30] py-6 px-4 shadow-md font-['Poppins']">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-black font-['Poppins']">¡Completa tu perfil de propietario!</h1>
        <p className="text-black mt-2 font-['Poppins']">
          Necesitamos algunos datos para verificar tu identidad y registrar tu propiedad
        </p>
      </div>
    </div>
  );
};

export default PropertyOwnerHeader; 