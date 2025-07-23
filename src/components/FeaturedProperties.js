import React from 'react';
import PropertyCard from './PropertyCard';
import { properties } from '../mock/properties';

const FeaturedProperties = () => {
  // Mostrar solo las propiedades destacadas (limitado a 6)
  const featuredProperties = properties.filter(property => property.isFeatured).slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0a2a5c]">Propiedades destacadas</h2>
          <p className="mt-4 text-lg text-[#0a2a5c] max-w-3xl mx-auto">
            Descubre las mejores opciones de alojamiento cerca del Tec de Monterrey, seleccionadas por su calidad y ubicación.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-[#ffd662] text-[#0a2a5c] rounded-md font-bold hover:bg-yellow-400 transition duration-300">
            Ver todas las propiedades
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;