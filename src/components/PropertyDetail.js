import React from 'react';

const PropertyDetail = ({ property, onBack }) => { // Recibe onBack como prop
  const { 
    title, 
    type, 
    price, 
    location, 
    image, 
    features, 
    rating, 
    isVerified, 
    bathrooms,
    petFriendly,
    description,
    images,
    owner
  } = property;

  // Si no hay imágenes adicionales, usar la imagen principal
  const allImages = images ? [image, ...images] : [image];
  
  // Características organizadas por categorías
  const amenities = features.filter(f => 
    !["Amueblada", "Baño privado", "Baño compartido", "Servicios incluidos", "Solo hombres", "Solo mujeres", "Mixto"].includes(f)
  );
  
  const isFurnished = features.includes("Amueblada");
  const hasServices = features.includes("Servicios incluidos");
  const bathroomType = features.includes("Baño privado") ? "Propio" : "Compartido";
  const genderType = features.find(f => ["Solo hombres", "Solo mujeres", "Mixto"].includes(f)) || "No especificado";

  return (
    <div className="min-h-screen bg-white">
      {/* Botón para regresar */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <button 
          onClick={onBack}
          className="flex items-center text-black hover:text-gray-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al buscador
        </button>
      </div>

      {/* Galería de imágenes */}
      <div className="relative h-96 bg-gray-200 mt-4">
        <img 
          src={allImages[0]} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {isVerified && (
          <div className="absolute top-4 left-4 bg-[#FFDC30] text-black text-sm font-bold px-3 py-1 rounded-md">
            Disponible
          </div>
        )}
      </div>
      
      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-black">{title}</h1>
          <div className="flex items-center bg-[#FFDC30] px-3 py-1 rounded-md">
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 font-bold text-black">{rating}</span>
          </div>
        </div>
        
        <p className="mt-2 text-gray-600">{location}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-black">${price}</span>
            <span className="text-gray-600"> /mes</span>
          </div>
          <span className="px-3 py-1 bg-gray-100 text-black rounded-md">
            {type}
          </span>
        </div>
        
        {/* Descripción */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-black mb-2">Descripción</h2>
          <p className="text-gray-600">
            {description || "Esta propiedad ofrece un espacio cómodo y bien ubicado, ideal para estudiantes del Tec de Monterrey. Cuenta con todas las comodidades necesarias para una estancia agradable y productiva durante tu etapa universitaria."}
          </p>
        </div>
        
        {/* Características principales */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
            <p className="text-black font-medium">{type}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Género</h3>
            <p className="text-black font-medium">{genderType}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Amueblado</h3>
            <p className="text-black font-medium">{isFurnished ? "Sí" : "No"}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">
              {type === "Cuarto" ? "Baño" : "Baños"}
            </h3>
            <p className="text-black font-medium">
              {type === "Cuarto" ? bathroomType : `${bathrooms || 1}`}
            </p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Servicios incluidos</h3>
            <p className="text-black font-medium">{hasServices ? "Sí" : "No"}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Pet friendly</h3>
            <p className="text-black font-medium">{petFriendly ? "Sí" : "No"}</p>
          </div>
        </div>
        
        {/* Amenidades */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-black mb-2">Amenidades</h2>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <span 
                key={index} 
                className="inline-block bg-gray-100 text-black text-sm px-3 py-1 rounded-md"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
        
        {/* Información del propietario */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold text-black mb-4">Información del propietario</h2>
          <div className="flex items-center">
            <img 
              src={owner?.avatar || "https://via.placeholder.com/60x60?text=User"} 
              alt="Propietario" 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-bold text-black">{owner?.name || "Propietario"}</h3>
              <p className="text-gray-600">{owner?.contact || "Contacto disponible después de reservar"}</p>
            </div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 px-6 py-3 bg-[#FFDC30] text-black rounded-md font-bold hover:bg-yellow-400 transition duration-300">
            Contactar al propietario
          </button>
          <button className="flex-1 px-6 py-3 border-2 border-[#FFDC30] text-black rounded-md font-bold hover:bg-yellow-100 transition duration-300">
            Agendar visita
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;