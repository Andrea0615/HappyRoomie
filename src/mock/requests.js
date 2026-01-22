export const requests = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Habitación individual en casa compartida",
    propertyImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
    propertyPrice: 4500,
    status: "pendiente", // pendiente, aceptada, rechazada
    student: {
      id: 101,
      name: "María González Pérez",
      profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      age: 20,
      studentId: "A01234570",
      university: "Tecnológico de Monterrey",
      major: "Ingeniería Industrial",
      email: "maria.gonzalez@tec.mx",
      phone: "+52 81 1111 2222",
      address: "Calle Nueva 456, Col. Centro",
      city: "Monterrey, NL"
    },
    requestDate: "2025-10-15",
    message: "Hola, estoy interesada en rentar esta habitación. Soy estudiante responsable y busco un lugar tranquilo para estudiar."
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Apartamento de 2 recámaras",
    propertyImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1380&q=80",
    propertyPrice: 12500,
    status: "pendiente",
    student: {
      id: 102,
      name: "Juan Carlos Silva",
      profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      age: 22,
      studentId: "A01234571",
      university: "Tecnológico de Monterrey",
      major: "Arquitectura",
      email: "juan.silva@tec.mx",
      phone: "+52 81 2222 3333",
      address: "Av. Universidad 789, Col. Tecnológico",
      city: "Monterrey, NL"
    },
    requestDate: "2025-10-14",
    message: "Buen día, me interesa el apartamento. Tengo un compañero de cuarto y ambos somos estudiantes del Tec."
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Estudio moderno cerca del Tec",
    propertyImage: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    propertyPrice: 8000,
    status: "aceptada",
    student: {
      id: 103,
      name: "Laura Martínez",
      profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      age: 21,
      studentId: "A01234572",
      university: "Tecnológico de Monterrey",
      major: "Diseño Gráfico",
      email: "laura.martinez@tec.mx",
      phone: "+52 81 3333 4444",
      address: "Blvd. Constitución 123, Col. San Pedro",
      city: "Monterrey, NL"
    },
    requestDate: "2025-10-10",
    message: "Me encantó el estudio, ¿podríamos agendar una visita?"
  },
  {
    id: 4,
    propertyId: 4,
    propertyTitle: "Casa compartida para 4 estudiantes",
    propertyImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
    propertyPrice: 15000,
    status: "rechazada",
    student: {
      id: 104,
      name: "Pedro Ramírez",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      age: 23,
      studentId: "A01234573",
      university: "Tecnológico de Monterrey",
      major: "Ingeniería Mecánica",
      email: "pedro.ramirez@tec.mx",
      phone: "+52 81 4444 5555",
      address: "Calle Principal 321, Col. Del Valle",
      city: "Monterrey, NL"
    },
    requestDate: "2025-10-08",
    message: "Busco un lugar para el próximo semestre, ¿está disponible?"
  }
];

export const offers = [
  {
    id: 1,
    requestId: 1, // Relacionado con la solicitud 1
    propertyId: 1,
    propertyTitle: "Habitación individual en casa compartida",
    propertyImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
    originalPrice: 4500,
    offeredPrice: 4000,
    status: "pendiente", // pendiente, aceptada, rechazada, contraoferta
    counterOffers: [], // Array de contraofertas (máximo 2)
    student: {
      id: 101,
      name: "María González Pérez",
      profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      age: 20,
      studentId: "A01234570",
      university: "Tecnológico de Monterrey",
      major: "Ingeniería Industrial",
      email: "maria.gonzalez@tec.mx",
      phone: "+52 81 1111 2222"
    },
    offerDate: "2025-10-15",
    message: "¿Sería posible negociar el precio a $4,000 mensuales?"
  },
  {
    id: 2,
    requestId: 2,
    propertyId: 2,
    propertyTitle: "Apartamento de 2 recámaras",
    propertyImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1380&q=80",
    originalPrice: 12500,
    offeredPrice: 11000,
    status: "contraoferta",
    counterOffers: [
      {
        id: 1,
        price: 11500,
        date: "2025-10-16",
        message: "Puedo ofrecer $11,500 mensuales"
      }
    ],
    student: {
      id: 102,
      name: "Juan Carlos Silva",
      profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      age: 22,
      studentId: "A01234571",
      university: "Tecnológico de Monterrey",
      major: "Arquitectura",
      email: "juan.silva@tec.mx",
      phone: "+52 81 2222 3333"
    },
    offerDate: "2025-10-14",
    message: "¿Podríamos negociar a $11,000? Es mi presupuesto máximo."
  }
];
