import React from 'react';

const PropertyOwnerGenderSelector = ({ onGenderChange }) => {
  return (
    <div className="mb-6 font-['Poppins']">
      <label className="block text-black font-medium mb-2 font-['Poppins']">
        Género
      </label>
      <select 
        onChange={(e) => onGenderChange(e.target.value)}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ffd662] focus:border-[#ffd662] block w-full p-2.5 font-['Poppins'] shadow-sm transition-all duration-200 hover:border-gray-400"
      >
        <option value="">Selecciona una opción</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select>
    </div>
  );
};

export default PropertyOwnerGenderSelector; 