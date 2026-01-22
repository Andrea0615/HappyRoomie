import React, { useState } from 'react';

// Iconos SVG
const ClockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DocumentIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

// Componente de barra de progreso
const ProgressBar = ({ estado, tieneOferta = false }) => {
  const estados = ['Pendiente'];
  if (tieneOferta) {
    estados.push('Oferta aceptada');
  }
  estados.push('Aprobada');

  const getEstadoIndex = () => {
    if (estado === 'pendiente') return 0;
    if (estado === 'oferta_aceptada') return tieneOferta ? 1 : 0;
    if (estado === 'aceptada') {
      // Si está aceptada, siempre va al final (Aprobada)
      return estados.length - 1;
    }
    return 0;
  };

  const currentIndex = getEstadoIndex();

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="relative">
        {/* Línea de progreso */}
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200">
          <div 
            className="h-full bg-[#ffd662] transition-all duration-300"
            style={{ width: `${(currentIndex / (estados.length - 1)) * 100}%` }}
          />
        </div>

        {/* Puntos de parada */}
        <div className="relative flex justify-between">
          {estados.map((estadoNombre, index) => {
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={index} className="flex flex-col items-center" style={{ flex: 1 }}>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#ffd662] border-[#ffd662]'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    isCurrent ? 'text-[#ffd662] font-bold' : isActive ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {estadoNombre}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RequestsDashboard = ({ onBack, onNavigate }) => {
  const [statusFilter, setStatusFilter] = useState('pendientes'); // 'pendientes' o 'aprobadas'

  // Datos reorganizados en 3 secciones
  // 1. Pendientes: solicitudes y ofertas pendientes (aún no aprobadas)
  const pendientes = [
    {
      id: 1,
      property: {
        id: 1,
        title: "Habitación individual en casa compartida",
        type: "Cuarto",
        price: 4500,
        location: "Ideal para estudiantes que buscan privacidad y comodidad.",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        features: ["Amueblada", "Servicios incluidos", "Baño privado", "Mixto", "Casa Club", "Jardín", "Hamaca", "Seguridad 24/7"],
        rating: 4.8,
        isVerified: true,
        petFriendly: false,
        bathrooms: 1
      },
      fecha: '2024-01-15',
      estado: 'pendiente',
      tieneOferta: false,
      tipo: 'solicitud'
    },
    {
      id: 2,
      property: {
        id: 2,
        title: "Apartamento de 2 recámaras",
        type: "Departamento",
        price: 12500,
        location: "Espacioso apartamento perfecto para compartir con amigos.",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1380&q=80",
        features: ["2 baños", "Estacionamiento", "Amueblada", "Servicios incluidos", "Mixto", "Alberca", "Gym"],
        rating: 4.6,
        isVerified: true,
        petFriendly: true,
        bathrooms: 2
      },
      fecha: '2024-01-18',
      estado: 'pendiente',
      tieneOferta: true,
      tipo: 'solicitud'
    },
    {
      id: 3,
      property: {
        id: 6,
        title: "Loft con excelente ubicación",
        type: "Departamento",
        price: 9000,
        precioOriginal: 9500,
        location: "Loft espacioso y luminoso, ideal para la vida urbana.",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        features: ["Terraza", "Pet friendly", "Amueblada", "Servicios incluidos", "Mixto", "Roof-top"],
        rating: 4.9,
        isVerified: true,
        petFriendly: true,
        bathrooms: 1
      },
      fecha: '2024-01-22',
      estado: 'pendiente',
      tieneOferta: true,
      tipo: 'oferta'
    }
  ];

  // Aprobadas: solicitudes y ofertas aprobadas
  const aprobadas = [
    {
      id: 6,
      property: {
        id: 3,
        title: "Estudio moderno cerca del Tec",
        type: "Departamento",
        price: 8000,
        location: "Diseño contemporáneo ideal para la vida estudiantil independiente.",
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Amueblada", "Servicios incluidos", "Gimnasio", "Terraza", "Baño privado", "Solo hombres"],
        rating: 4.5,
        isVerified: true,
        petFriendly: false,
        bathrooms: 1
      },
      fecha: '2024-01-10',
      estado: 'aceptada',
      tieneOferta: false,
      tipo: 'solicitud'
    },
    {
      id: 7,
      property: {
        id: 5,
        title: "Habitación en departamento moderno",
        type: "Cuarto",
        price: 4800,
        precioOriginal: 5200,
        location: "Habitación privada en un departamento con todas las comodidades.",
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        features: ["Baño privado", "Amueblada", "Servicios incluidos", "Solo mujeres", "Casa Club"],
        rating: 4.7,
        isVerified: true,
        petFriendly: false,
        bathrooms: 1
      },
      fecha: '2024-01-12',
      estado: 'aceptada',
      tieneOferta: true,
      tipo: 'solicitud'
    },
    {
      id: 8,
      property: {
        id: 7,
        title: "Habitación en residencia estudiantil",
        type: "Cuarto",
        price: 5200,
        precioOriginal: 5500,
        location: "Ambiente seguro y diseñado para el éxito académico.",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        features: ["Lavandería", "Amueblada", "Servicios incluidos", "Baño compartido", "Solo mujeres"],
        rating: 4.2,
        isVerified: true,
        petFriendly: false,
        bathrooms: 1
      },
      fecha: '2024-01-12',
      estado: 'aceptada',
      tieneOferta: true,
      tipo: 'oferta'
    }
  ];

  // 2. Revisar ofertas: ofertas rechazadas (necesitan revisión)
  const revisarOfertas = [
    {
      id: 4,
      property: {
        id: 8,
        title: "Departamento de lujo para compartir",
        type: "Departamento",
        price: 17000,
        precioOriginal: 18000,
        location: "Vive con estilo en un departamento con amenidades premium.",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["2 baños", "Amueblada", "Servicios incluidos", "Solo hombres", "Roof-top", "Estacionamiento techado"],
        rating: 4.8,
        isVerified: true,
        petFriendly: true,
        bathrooms: 2
      },
      fecha: '2024-01-08',
      estado: 'rechazada',
      tieneOferta: true,
      tipo: 'oferta'
    }
  ];

  // 3. Rechazadas: solicitudes denegadas
  const rechazadas = [
    {
      id: 5,
      property: {
        id: 4,
        title: "Casa compartida para 4 estudiantes",
        type: "Casa",
        price: 15000,
        location: "Amplia casa con espacios comunes para convivir y estudiar.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        features: ["2 baños", "Amueblada", "Servicios incluidos", "Mixto", "Casa Club", "Asadores"],
        rating: 4.3,
        isVerified: false,
        petFriendly: true,
        bathrooms: 2
      },
      fecha: '2024-01-05',
      estado: 'rechazada',
      tieneOferta: false,
      tipo: 'solicitud'
    }
  ];

  const handleViewDetails = (property) => {
    if (onNavigate) {
      onNavigate('propertyDetail', property);
    }
  };

  const PropertyCardWithProgress = ({ property, item }) => {
    const tieneOferta = item.tieneOferta || (item.tipo === 'oferta');
    const estado = item.estado;
    const { id, title, type: propertyType, price, location, image, features, rating, isVerified, bathrooms, petFriendly } = property;

    // Filtra las características para mostrar solo las relevantes en la tarjeta
    const displayFeatures = features.filter(feature => 
      feature === "Amueblada" || 
      feature === "Servicios incluidos"
    );

    const bathroomFeatureForRoom = features.includes("Baño privado") ? "Baño Propio" : 
                                   (features.includes("Baño compartido") ? "Baño Compartido" : null);

    const formatPrice = (value) => {
      if (typeof value !== 'number') return value;
      return value.toLocaleString('en-US');
    };

    const capitalizeFirstWord = (text) => {
      if (!text) return '';
      const words = text.split(' ');
      if (words.length === 0) return '';
      return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase() + ' ' + words.slice(1).join(' ').toLowerCase();
    };

    return (
      <div className="flex-shrink-0 w-80">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
          {/* Imagen */}
          <div className="relative">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-48 object-cover"
            />
            {isVerified && (
              <div className="absolute top-2 left-2 bg-[#ffd662] text-black text-xs font-bold px-2 py-1 rounded-md">
                Disponible
              </div>
            )}
            {petFriendly && (
              <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-md">
                Pet Friendly
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-md">
              {propertyType}
            </div>
          </div>
          
          {/* Contenido */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-black truncate">{title}</h3>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-[#ffd662]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm font-medium text-black">{rating}</span>
              </div>
            </div>
            
            <p className="mt-1 text-sm text-gray-600">{location}</p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {displayFeatures.map((feature, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded"
                >
                  {capitalizeFirstWord(feature)}
                </span>
              ))}
              {propertyType === "Cuarto" && bathroomFeatureForRoom && (
                <span className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded">{capitalizeFirstWord(bathroomFeatureForRoom)}</span>
              )}
              {(propertyType === "Casa" || propertyType === "Departamento") && bathrooms && (
                <span className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded">
                  {bathrooms === 1 ? "1 baño" : `${formatPrice(bathrooms)} baños`}
                </span>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                {(item.tipo === 'oferta' || tieneOferta) && property.precioOriginal ? (
                  <div>
                    <span className="text-lg font-bold text-green-600">${formatPrice(price)}</span>
                    <span className="text-sm text-gray-600"> /mes</span>
                    <div className="text-xs text-gray-500 line-through">
                      ${formatPrice(property.precioOriginal)}/mes
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-lg font-bold text-black">${formatPrice(price)}</span>
                    <span className="text-sm text-gray-600"> /mes</span>
                  </>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewDetails(property)}
                  className="px-3 py-1 bg-[#ffd662] text-black rounded font-medium hover:bg-yellow-400 transition duration-300"
                >
                  Ver detalles
                </button>
                <button 
                  onClick={() => {}}
                  className="px-3 py-1 rounded font-medium transition duration-300 bg-white text-black border border-black hover:bg-gray-100"
                >
                  Comparar
                </button>
              </div>
            </div>

            {/* Barra de progreso - solo para pendientes */}
            {estado === 'pendiente' && (
              <ProgressBar estado={estado} tieneOferta={tieneOferta} />
            )}

            {/* Fecha */}
            <div className="mt-3 text-center text-xs text-gray-500">
              Fecha: {item.fecha}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RowSection = ({ title, icon, items, showFilter = false, filterValue, onFilterChange }) => {
    const IconComponent = icon;
    
    return (
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <IconComponent className="w-6 h-6 text-black" />
          <h3 className="text-xl font-bold text-black">{title}</h3>
          {showFilter && (
            <div className="ml-4 flex gap-2 border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => onFilterChange('pendientes')}
                className={`px-4 py-1 text-sm font-medium transition-colors ${
                  filterValue === 'pendientes'
                    ? 'bg-[#ffd662] text-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pendientes
              </button>
              <button
                onClick={() => onFilterChange('aprobadas')}
                className={`px-4 py-1 text-sm font-medium transition-colors ${
                  filterValue === 'aprobadas'
                    ? 'bg-[#ffd662] text-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Aprobadas
              </button>
            </div>
          )}
          <span className="ml-auto bg-gray-200 text-black text-sm font-bold px-3 py-1 rounded-full">
            {items.length}
          </span>
        </div>
        
        {items.length > 0 ? (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
              {items.map((item) => {
                const property = item.property;
                const displayProperty = (item.tipo === 'oferta' || item.tieneOferta) && property.precioOriginal 
                  ? { ...property, precioOriginal: property.precioOriginal }
                  : property;
                
                return (
                  <PropertyCardWithProgress
                    key={item.id}
                    property={displayProperty}
                    item={item}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-lg">No hay {title.toLowerCase()}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button 
          onClick={onBack}
          className="flex items-center text-black hover:text-gray-700 transition-colors mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>

        <div className="flex items-center gap-3 mb-8">
          <DocumentIcon className="w-8 h-8 text-[#ffd662]" />
          <h1 className="text-3xl font-bold text-black">Mis solicitudes</h1>
        </div>
      </div>

      {/* Contenido principal - 3 secciones */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* 1. Status (con filtro Pendientes/Aprobadas) */}
        <RowSection 
          title="Status" 
          icon={ClockIcon} 
          items={statusFilter === 'pendientes' ? pendientes : aprobadas}
          showFilter={true}
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
        />

        {/* 2. Revisar ofertas */}
        <RowSection 
          title="Revisar ofertas" 
          icon={CheckCircleIcon} 
          items={revisarOfertas}
        />

        {/* 3. Rechazadas */}
        <RowSection 
          title="Rechazadas" 
          icon={XCircleIcon} 
          items={rechazadas}
        />
      </div>
    </div>
  );
};

export default RequestsDashboard;
