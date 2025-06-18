export const properties = [
  {
    id: 1,
    title: "Habitación individual en casa compartida",
    type: "Cuarto", // Cambiado a "Cuarto" para coincidir con el filtro
    price: 4500,
    location: "Ideal para estudiantes que buscan privacidad y comodidad.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    features: [
      "Amueblada", // Para filtro "Amueblado: Sí"
      "Internet", 
      "Servicios incluidos", // Para filtro "Servicios: Con servicios"
      "Cocina compartida",
      "Baño privado", // Para filtro "Baño: Propio"
      "Mixto" // Para filtro "Género compatible: Mixto"
    ],
    rating: 4.8,
    isVerified: true,
    isFeatured: true,
    petFriendly: false, // Para filtro "Pet Friendly"
    parkingSpaces: 0 // Estacionamiento
  },
  {
    id: 2,
    title: "Apartamento de 2 recámaras",
    type: "Departamento", // Cambiado a "Departamento" para coincidir con el filtro
    price: 12500, // Precio aumentado
    location: "Espacioso apartamento perfecto para compartir con amigos.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1380&q=80",
    features: [
      "2 baños", 
      "Estacionamiento", // Para filtro "Estacionamiento: Sí"
      "Seguridad 24/7", 
      "Amueblada", // Para filtro "Amueblado: Sí"
      "Servicios incluidos", // Para filtro "Servicios: Con servicios"
      "Mixto" // Para filtro "Género compatible: Mixto"
    ],
    bathrooms: 2, // Número de baños para Casa/Departamento
    rating: 4.6,
    isVerified: true,
    isFeatured: true,
    petFriendly: true, // Para filtro "Pet Friendly"
    parkingSpaces: 1 // Estacionamiento
  },
  {
    id: 3,
    title: "Estudio moderno cerca del Tec",
    type: "Departamento", // Cambiado a "Departamento" para coincidir con el filtro
    price: 8000, // Precio aumentado
    location: "Diseño contemporáneo ideal para la vida estudiantil independiente.",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    features: [
      "Amueblada", // Para filtro "Amueblado: Sí"
      "Servicios incluidos", // Para filtro "Servicios: Con servicios"
      "Gimnasio", 
      "Terraza",
      "Baño privado", // Para filtro "Baño: Propio"
      "Solo hombres" // Para filtro "Género compatible: Solo hombres"
    ],
    bathrooms: 1, // Número de baños para Casa/Departamento
    rating: 4.5,
    isVerified: true,
    isFeatured: true,
    petFriendly: false, // Para filtro "Pet Friendly"
    parkingSpaces: 0 // Estacionamiento
  },
  {
    id: 4,
    title: "Casa compartida para 4 estudiantes",
    type: "Casa", // Coincide con el filtro
    price: 15000, // Precio aumentado
    location: "Amplia casa con espacios comunes para convivir y estudiar.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    features: [
      "4 habitaciones", 
      "2 baños", 
      "Sala de estudio", 
      "Jardín",
      "Amueblada", // Para filtro "Amueblado: Sí"
      "Servicios incluidos", // Para filtro "Servicios: Con servicios"
      "Baño compartido", // Para filtro "Baño: Compartido"
      "Mixto" // Para filtro "Género compatible: Mixto"
    ],
    bathrooms: 2, // Número de baños para Casa/Departamento
    rating: 4.3,
    isVerified: false,
    isFeatured: true,
    petFriendly: true, // Para filtro "Pet Friendly"
    parkingSpaces: 2 // Estacionamiento
  },
  {
    id: 5,
    title: "Habitación en departamento moderno",
    type: "Cuarto", // Cambiado a "Cuarto" para coincidir con el filtro
    price: 5200,
    location: "Habitación privada en un departamento con todas las comodidades.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    features: [
      "Baño privado", // Para filtro "Baño: Propio"
      "Closet amplio", 
      "Áreas comunes", 
      "Seguridad",
      "Amueblada", // Para filtro "Amueblado: Sí"
      "Servicios incluidos", // Para filtro "Servicios: Con servicios"
      "Solo mujeres" // Para filtro "Género compatible: Solo mujeres"
    ],
    rating: 4.7,
    isVerified: true,
    isFeatured: true,
    petFriendly: false, // Para filtro "Pet Friendly"
    parkingSpaces: 0 // Estacionamiento
  },
  {
    id: 6,
    title: "Loft con excelente ubicación",
    type: "Departamento", // Cambiado a "Departamento" para coincidir con el filtro
    price: 9500, // Precio aumentado
    location: "Loft espacioso y luminoso, ideal para la vida urbana.",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    features: [
      "Espacio abierto", 
      "Cocina equipada", 
      "Terraza", 
      "Pet friendly", // Para filtro "Pet Friendly"
      "Amueblada", // Para filtro "Amueblado: Sí"
      "Servicios incluidos", // Para filtro "Servicios: Con servicios"
      "Mixto" // Para filtro "Género compatible: Mixto"
    ],
    bathrooms: 1, // Número de baños para Casa/Departamento
    rating: 4.9,
    isVerified: true,
    isFeatured: true,
    petFriendly: true, // Para filtro "Pet Friendly"
    parkingSpaces: 1 // Estacionamiento
  },
  {
    id: 7,
    title: "Habitación en residencia estudiantil",
    type: "Cuarto", // Cambiado a "Cuarto" para coincidir con el filtro
    price: 5500,
    location: "Ambiente seguro y diseñado para el éxito académico.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    features: [
      "Limpieza incluida", 
      "Comedor", 
      "Sala de estudio", 
      "Lavandería",
      "Amueblada", // Para filtro "Amueblado: Sí"
      "Servicios incluidos", // Para filtro "Servicios: Con servicios"
      "Baño compartido", // Para filtro "Baño: Compartido"
      "Solo mujeres" // Para filtro "Género compatible: Solo mujeres"
    ],
    rating: 4.2,
    isVerified: true,
    isFeatured: false,
    petFriendly: false, // Para filtro "Pet Friendly"
    parkingSpaces: 0 // Estacionamiento
  },
  {
    id: 8,
    title: "Departamento de lujo para compartir",
    type: "Departamento", // Coincide con el filtro
    price: 18000, // Precio aumentado
    location: "Vive con estilo en un departamento con amenidades premium.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    features: [
      "3 recámaras", 
      "2 baños", 
      "Alberca", 
      "Gimnasio",
      "Amueblada", // Para filtro "Amueblado: Sí"
      "Servicios incluidos", // Para filtro "Servicios: Con servicios"
      "Solo hombres" // Para filtro "Género compatible: Solo hombres"
    ],
    bathrooms: 2, // Número de baños para Casa/Departamento
    rating: 4.8,
    isVerified: true,
    isFeatured: false,
    petFriendly: true, // Para filtro "Pet Friendly"
    parkingSpaces: 3 // Estacionamiento
  }
];

// DONE