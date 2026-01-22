export const tenants = [
  {
    id: 1,
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    fullName: "Carlos Alberto Méndez García",
    propertyId: 1,
    propertyTitle: "Habitación individual en casa compartida",
    contractStart: "2025-07-01",
    contractEnd: "2025-12-31",
    contractStatus: "vigente",
    emergencyContact: {
      name: "María Méndez García",
      relationship: "Madre",
      phone: "+52 81 1234 5678",
      email: "maria.mendez@email.com"
    },
    personalInfo: {
      age: 22,
      studentId: "A01234567",
      university: "Tecnológico de Monterrey",
      major: "Ingeniería en Sistemas",
      email: "carlos.mendez@tec.mx",
      phone: "+52 81 9876 5432",
      address: "Calle Principal 123, Col. Centro",
      city: "Monterrey, NL",
      dateOfBirth: "2003-05-15",
      nationality: "Mexicana"
    },
    contractDetails: {
      monthlyRent: 4500,
      deposit: 9000,
      paymentMethod: "Transferencia bancaria",
      paymentHistory: [
        { month: "Julio 2025", amount: 4500, status: "pagado", date: "2025-07-01" },
        { month: "Agosto 2025", amount: 4500, status: "pagado", date: "2025-08-01" },
        { month: "Septiembre 2025", amount: 4500, status: "pagado", date: "2025-09-01" },
        { month: "Octubre 2025", amount: 4500, status: "pendiente", date: null }
      ],
      documents: [
        { name: "Contrato de arrendamiento", status: "firmado", date: "2025-06-25" },
        { name: "Identificación oficial", status: "subido", date: "2025-06-20" },
        { name: "Comprobante de estudios", status: "subido", date: "2025-06-20" }
      ],
      notes: "Estudiante responsable y puntual con los pagos. Muy respetuoso con las reglas de la casa."
    }
  },
  {
    id: 2,
    profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    fullName: "Ana Sofía Rodríguez López",
    propertyId: 2,
    propertyTitle: "Apartamento de 2 recámaras",
    contractStart: "2025-08-15",
    contractEnd: "2026-05-31",
    contractStatus: "vigente",
    emergencyContact: {
      name: "Roberto Rodríguez",
      relationship: "Padre",
      phone: "+52 81 2345 6789",
      email: "roberto.rodriguez@email.com"
    },
    personalInfo: {
      age: 21,
      studentId: "A01234568",
      university: "Tecnológico de Monterrey",
      major: "Diseño Industrial",
      email: "ana.rodriguez@tec.mx",
      phone: "+52 81 8765 4321",
      address: "Av. Revolución 456, Col. Del Valle",
      city: "Monterrey, NL",
      dateOfBirth: "2004-03-20",
      nationality: "Mexicana"
    },
    contractDetails: {
      monthlyRent: 12500,
      deposit: 25000,
      paymentMethod: "Transferencia bancaria",
      paymentHistory: [
        { month: "Agosto 2025", amount: 12500, status: "pagado", date: "2025-08-15" },
        { month: "Septiembre 2025", amount: 12500, status: "pagado", date: "2025-09-01" },
        { month: "Octubre 2025", amount: 12500, status: "pendiente", date: null }
      ],
      documents: [
        { name: "Contrato de arrendamiento", status: "firmado", date: "2025-08-10" },
        { name: "Identificación oficial", status: "subido", date: "2025-08-05" },
        { name: "Comprobante de estudios", status: "subido", date: "2025-08-05" },
        { name: "Aval", status: "firmado", date: "2025-08-10" }
      ],
      notes: "Excelente inquilina. Comparte el departamento con otra estudiante. Muy organizada y limpia."
    }
  },
  {
    id: 3,
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    fullName: "Diego Fernando Martínez Torres",
    propertyId: 4,
    propertyTitle: "Casa compartida para 4 estudiantes",
    contractStart: "2025-06-01",
    contractEnd: "2025-12-15",
    contractStatus: "vigente",
    emergencyContact: {
      name: "Patricia Torres",
      relationship: "Madre",
      phone: "+52 81 3456 7890",
      email: "patricia.torres@email.com"
    },
    personalInfo: {
      age: 23,
      studentId: "A01234569",
      university: "Tecnológico de Monterrey",
      major: "Administración de Empresas",
      email: "diego.martinez@tec.mx",
      phone: "+52 81 7654 3210",
      address: "Blvd. Constitución 789, Col. San Pedro",
      city: "Monterrey, NL",
      dateOfBirth: "2002-11-10",
      nationality: "Mexicana"
    },
    contractDetails: {
      monthlyRent: 15000,
      deposit: 30000,
      paymentMethod: "Transferencia bancaria",
      paymentHistory: [
        { month: "Junio 2025", amount: 15000, status: "pagado", date: "2025-06-01" },
        { month: "Julio 2025", amount: 15000, status: "pagado", date: "2025-07-01" },
        { month: "Agosto 2025", amount: 15000, status: "pagado", date: "2025-08-01" },
        { month: "Septiembre 2025", amount: 15000, status: "pagado", date: "2025-09-01" },
        { month: "Octubre 2025", amount: 15000, status: "pendiente", date: null }
      ],
      documents: [
        { name: "Contrato de arrendamiento", status: "firmado", date: "2025-05-25" },
        { name: "Identificación oficial", status: "subido", date: "2025-05-20" },
        { name: "Comprobante de estudios", status: "subido", date: "2025-05-20" }
      ],
      notes: "Líder del grupo de estudiantes en la casa. Muy responsable y ayuda a mantener el orden."
    }
  }
];

// Función helper para formatear fechas
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Función helper para obtener la duración del contrato
export const getContractDuration = (start, end) => {
  return `${formatDate(start)} – ${formatDate(end)}`;
};
