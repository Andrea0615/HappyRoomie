import React, { useMemo } from 'react';
import PropertyCard from './PropertyCard';
import { properties } from '../mock/properties';

const MyProperties = ({ onNavigate }) => {
  // Por ahora usamos todas las propiedades como ejemplo
  // En producción, esto vendría de una API o estado del usuario
  const myProperties = properties;

  // Función para determinar la categoría de una propiedad
  const getPropertyCategory = (property) => {
    const { type, title, location } = property;
    const titleLower = title.toLowerCase();
    const locationLower = location.toLowerCase();

    // Loft
    if (type === "Loft" || titleLower.includes("loft")) {
      return "Loft";
    }

    // Casa completa
    if (type === "Casa") {
      return "Casa completa";
    }

    // Habitación dentro de una casa
    if (type === "Cuarto" && (titleLower.includes("casa") || locationLower.includes("casa"))) {
      return "Habitación dentro de una casa";
    }

    // Habitación dentro de un departamento
    if (type === "Cuarto" && (titleLower.includes("departamento") || titleLower.includes("depto") || locationLower.includes("departamento"))) {
      return "Habitación dentro de un departamento";
    }

    // Departamento completo (por defecto para Departamentos que no son Loft)
    if (type === "Departamento") {
      return "Departamento completo";
    }

    // Por defecto, si es Cuarto y no se identificó, asumimos que es en casa
    if (type === "Cuarto") {
      return "Habitación dentro de una casa";
    }

    return "Otros";
  };

  // Agrupar propiedades por categoría
  const groupedProperties = useMemo(() => {
    const groups = {
      "Casa completa": [],
      "Departamento completo": [],
      "Habitación dentro de una casa": [],
      "Habitación dentro de un departamento": [],
      "Loft": []
    };

    myProperties.forEach(property => {
      const category = getPropertyCategory(property);
      if (groups[category]) {
        groups[category].push(property);
      }
    });

    return groups;
  }, [myProperties]);

  // Orden de las categorías según lo solicitado
  const categoryOrder = [
    "Casa completa",
    "Departamento completo",
    "Habitación dentro de una casa",
    "Habitación dentro de un departamento",
    "Loft"
  ];

  const handleRegisterProperty = () => {
    onNavigate('propertyOwnerRegistration');
  };

  const handleViewDetails = (property) => {
    onNavigate('propertyDetail', property);
  };

  const handleCompareToggle = (property) => {
    // Función placeholder para mantener compatibilidad con PropertyCard
    console.log('Comparar propiedad:', property);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con título y botón */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Mis Propiedades</h1>
            <p className="mt-2 text-lg text-gray-600">
              Administra todas tus propiedades registradas
            </p>
          </div>
          <button
            onClick={handleRegisterProperty}
            className="px-6 py-3 bg-[#ffd662] text-black rounded-md font-bold hover:bg-yellow-400 transition duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Registrar propiedad
          </button>
        </div>

        {/* Propiedades agrupadas por categoría */}
        {myProperties.length > 0 ? (
          <div className="space-y-12">
            {categoryOrder.map((category) => {
              const categoryProperties = groupedProperties[category] || [];
              if (categoryProperties.length === 0) return null;

              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-black">{category}</h2>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {categoryProperties.length} {categoryProperties.length === 1 ? 'propiedad' : 'propiedades'}
                    </span>
                  </div>
                  
                  {/* Scroll horizontal */}
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-6 min-w-max">
                      {categoryProperties.map(property => (
                        <div key={property.id} className="flex-shrink-0 w-80">
                          <PropertyCard
                            property={property}
                            onViewDetails={handleViewDetails}
                            onCompareToggle={handleCompareToggle}
                            isComparing={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-xl font-bold text-black mb-2">No tienes propiedades registradas</h3>
            <p className="text-gray-600 mb-6">Comienza registrando tu primera propiedad</p>
            <button
              onClick={handleRegisterProperty}
              className="px-6 py-3 bg-[#ffd662] text-black rounded-md font-bold hover:bg-yellow-400 transition duration-300 shadow-md hover:shadow-lg"
            >
              Registrar mi primera propiedad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
