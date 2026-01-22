import React, { useMemo, useState } from 'react';
import PropertyCard from './PropertyCard';
import { properties } from '../mock/properties';

const MyProperties = ({ onNavigate }) => {
  // Por ahora usamos todas las propiedades como ejemplo
  // En producción, esto vendría de una API o estado del usuario
  const myProperties = properties;
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleEdit = (property) => {
    // Navegar a edición de propiedad (puedes crear esta página después)
    console.log('Editar propiedad:', property);
    // onNavigate('editProperty', property);
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (propertyToDelete) {
      // Aquí iría la lógica para eliminar la propiedad
      console.log('Eliminar propiedad:', propertyToDelete);
      // En producción: eliminar de la base de datos
    }
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setPropertyToDelete(null);
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
                        <div key={property.id} className="flex-shrink-0 w-80 relative">
                          <PropertyCard
                            property={property}
                            onViewDetails={handleViewDetails}
                            onCompareToggle={handleCompareToggle}
                            isComparing={false}
                          />
                          {/* Botones de acción del propietario */}
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button
                              onClick={() => handleEdit(property)}
                              className="p-2 bg-white rounded-full shadow-md hover:bg-yellow-100 transition duration-300"
                              title="Editar propiedad"
                            >
                              <svg className="w-5 h-5 text-[#ffd662]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(property)}
                              className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition duration-300"
                              title="Eliminar propiedad"
                            >
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
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

        {/* Modal de confirmación de eliminación */}
        {showDeleteModal && propertyToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">¿Estás seguro de eliminar esta propiedad?</h3>
                <p className="text-gray-600">
                  Esta acción no se puede deshacer. La propiedad <span className="font-semibold">{propertyToDelete.title}</span> será eliminada permanentemente.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
