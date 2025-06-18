import React, { useState } from 'react';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    roommates: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para buscar propiedades
    console.log('Búsqueda con parámetros:', searchParams);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-black mb-1">
                Ubicación
              </label>
              <select
                id="location"
                name="location"
                value={searchParams.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
              >
                <option value="">Selecciona campus</option>
                <option value="monterrey">Campus Monterrey</option>
                <option value="cdmx">Campus Ciudad de México</option>
                <option value="guadalajara">Campus Guadalajara</option>
                <option value="puebla">Campus Puebla</option>
                <option value="queretaro">Campus Querétaro</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-black mb-1">
                Tipo de propiedad
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={searchParams.propertyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
              >
                <option value="">Cualquier tipo</option>
                <option value="room">Habitación</option>
                <option value="apartment">Apartamento</option>
                <option value="house">Casa</option>
                <option value="studio">Estudio</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-black mb-1">
                Rango de precio
              </label>
              <select
                id="priceRange"
                name="priceRange"
                value={searchParams.priceRange}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
              >
                <option value="">Cualquier precio</option>
                <option value="0-3000">$0 - $3,000</option>
                <option value="3000-5000">$3,000 - $5,000</option>
                <option value="5000-8000">$5,000 - $8,000</option>
                <option value="8000-12000">$8,000 - $12,000</option>
                <option value="12000+">$12,000+</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#FFDC30] text-black rounded-md font-bold hover:bg-yellow-400 transition duration-300"
              >
                Buscar
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="roommates"
              name="roommates"
              checked={searchParams.roommates}
              onChange={handleChange}
              className="h-4 w-4 text-[#FFDC30] focus:ring-[#FFDC30] border-gray-300 rounded"
            />
            <label htmlFor="roommates" className="ml-2 block text-sm text-black">
              Busco también roomies compatibles
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;