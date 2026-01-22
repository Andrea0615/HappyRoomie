import React, { useState, useMemo } from 'react';
import { tenants, getContractDuration } from '../mock/tenants';

const MyTenants = ({ onNavigate }) => {
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const INITIAL_VISIBLE_COUNT = 3; // Número de inquilinos visibles inicialmente por categoría

  const handleViewProfile = (tenant) => {
    setSelectedTenant(tenant);
    setShowProfileModal(true);
  };

  const handleViewDetails = (tenant) => {
    setSelectedTenant(tenant);
    setShowDetailsModal(true);
  };

  const closeModals = () => {
    setShowProfileModal(false);
    setShowDetailsModal(false);
    setSelectedTenant(null);
  };

  // Función para determinar la categoría de una propiedad basándose en el título
  const getPropertyCategory = (propertyTitle) => {
    const titleLower = propertyTitle.toLowerCase();

    // Loft
    if (titleLower.includes("loft")) {
      return "Loft";
    }

    // Casa completa
    if (titleLower.includes("casa compartida") || titleLower.includes("casa completa")) {
      return "Casa completa";
    }

    // Habitación dentro de una casa
    if (titleLower.includes("habitación") && (titleLower.includes("casa") || titleLower.includes("casa compartida"))) {
      return "Habitación dentro de una casa";
    }

    // Habitación dentro de un departamento
    if (titleLower.includes("habitación") && (titleLower.includes("departamento") || titleLower.includes("depto") || titleLower.includes("apartamento"))) {
      return "Habitación dentro de un departamento";
    }

    // Departamento completo
    if (titleLower.includes("apartamento") || titleLower.includes("departamento")) {
      return "Departamento completo";
    }

    // Por defecto, si es habitación y no se identificó, asumimos que es en casa
    if (titleLower.includes("habitación")) {
      return "Habitación dentro de una casa";
    }

    return "Otros";
  };

  // Agrupar inquilinos por categoría
  const groupedTenants = useMemo(() => {
    const groups = {
      "Casa completa": [],
      "Departamento completo": [],
      "Habitación dentro de una casa": [],
      "Habitación dentro de un departamento": [],
      "Loft": []
    };

    tenants.forEach(tenant => {
      const category = getPropertyCategory(tenant.propertyTitle);
      if (groups[category]) {
        groups[category].push(tenant);
      }
    });

    // Filtrar solo las categorías que tienen inquilinos
    const filteredGroups = {};
    Object.keys(groups).forEach(category => {
      if (groups[category].length > 0) {
        filteredGroups[category] = groups[category];
      }
    });

    return filteredGroups;
  }, [tenants]);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      vigente: { text: 'Vigente', color: 'bg-green-100 text-green-800' },
      'próximo a vencer': { text: 'Próximo a vencer', color: 'bg-yellow-100 text-yellow-800' },
      vencido: { text: 'Vencido', color: 'bg-red-100 text-red-800' }
    };
    const config = statusConfig[status] || statusConfig.vigente;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Mis Inquilinos</h1>
          <p className="mt-2 text-lg text-gray-600">
            Gestiona y visualiza la información de todos tus inquilinos activos
          </p>
        </div>

        {/* Lista de inquilinos agrupados por categoría */}
        {tenants.length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedTenants).map(([category, categoryTenants]) => {
              const isExpanded = expandedCategories[category];
              const visibleCount = isExpanded ? categoryTenants.length : INITIAL_VISIBLE_COUNT;
              const visibleTenants = categoryTenants.slice(0, visibleCount);
              const hasMore = categoryTenants.length > INITIAL_VISIBLE_COUNT;

              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-black">{category}</h2>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {categoryTenants.length} {categoryTenants.length === 1 ? 'inquilino' : 'inquilinos'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleTenants.map(tenant => (
                      <div
                        key={tenant.id}
                        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      >
                        {/* Tarjeta del inquilino */}
                        <div className="p-6">
                          {/* Foto y nombre */}
                          <div className="flex items-center gap-4 mb-4">
                            <img
                              src={tenant.profilePhoto}
                              alt={tenant.fullName}
                              className="w-16 h-16 rounded-full object-cover border-2 border-[#ffd662]"
                            />
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-black">{tenant.fullName}</h3>
                              {getStatusBadge(tenant.contractStatus)}
                            </div>
                          </div>

                          {/* Información básica */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-[#ffd662] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500">Propiedad</p>
                                <p className="text-sm font-medium text-black">{tenant.propertyTitle}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-[#ffd662] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500">Contrato</p>
                                <p className="text-sm font-medium text-black">
                                  {getContractDuration(tenant.contractStart, tenant.contractEnd)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-[#ffd662] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500">Contacto de emergencia</p>
                                <p className="text-sm font-medium text-black">{tenant.emergencyContact.name}</p>
                                <p className="text-xs text-gray-600">{tenant.emergencyContact.phone}</p>
                              </div>
                            </div>
                          </div>

                          {/* Botones de acción */}
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => handleViewProfile(tenant)}
                              className="flex-1 px-4 py-2 bg-[#ffd662] text-black rounded-md font-semibold hover:bg-yellow-400 transition duration-300 text-sm"
                            >
                              Ver perfil
                            </button>
                            <button
                              onClick={() => handleViewDetails(tenant)}
                              className="flex-1 px-4 py-2 bg-white border-2 border-[#ffd662] text-black rounded-md font-semibold hover:bg-yellow-50 transition duration-300 text-sm"
                            >
                              Ver detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botón Ver más / Ver menos */}
                  {hasMore && (
                    <div className="text-center">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="px-6 py-2 bg-[#ffd662] text-black rounded-md font-semibold hover:bg-yellow-400 transition duration-300 flex items-center gap-2 mx-auto"
                      >
                        {isExpanded ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Ver menos
                          </>
                        ) : (
                          <>
                            Ver más ({categoryTenants.length - INITIAL_VISIBLE_COUNT} más)
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-bold text-black mb-2">Aún no tienes inquilinos activos</h3>
            <p className="text-gray-600 mb-6">
              Las solicitudes aceptadas aparecerán aquí.
            </p>
          </div>
        )}
      </div>

      {/* Modal de Ver Perfil */}
      {showProfileModal && selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">Perfil del Inquilino</h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-black text-2xl font-bold"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Foto y nombre principal */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={selectedTenant.profilePhoto}
                  alt={selectedTenant.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#ffd662]"
                />
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">{selectedTenant.fullName}</h3>
                  <p className="text-gray-600">{selectedTenant.personalInfo.major}</p>
                  <p className="text-sm text-gray-500">{selectedTenant.personalInfo.university}</p>
                </div>
              </div>

              {/* Información personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#ffd662]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Información Personal
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Edad</p>
                      <p className="text-sm font-medium text-black">{selectedTenant.personalInfo.age} años</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fecha de nacimiento</p>
                      <p className="text-sm font-medium text-black">
                        {new Date(selectedTenant.personalInfo.dateOfBirth).toLocaleDateString('es-MX', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Nacionalidad</p>
                      <p className="text-sm font-medium text-black">{selectedTenant.personalInfo.nationality}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Matrícula</p>
                      <p className="text-sm font-medium text-black">{selectedTenant.personalInfo.studentId}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#ffd662]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contacto
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Correo electrónico</p>
                      <p className="text-sm font-medium text-black">{selectedTenant.personalInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <p className="text-sm font-medium text-black">{selectedTenant.personalInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Dirección</p>
                      <p className="text-sm font-medium text-black">{selectedTenant.personalInfo.address}</p>
                      <p className="text-sm text-gray-600">{selectedTenant.personalInfo.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contacto de emergencia */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ffd662]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Contacto de Emergencia
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-black">{selectedTenant.emergencyContact.name}</p>
                  <p className="text-sm text-gray-600">{selectedTenant.emergencyContact.relationship}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedTenant.emergencyContact.phone}</p>
                  <p className="text-sm text-gray-600">{selectedTenant.emergencyContact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ver Detalles */}
      {showDetailsModal && selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">Detalles del Contrato</h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-black text-2xl font-bold"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Información del inquilino */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={selectedTenant.profilePhoto}
                  alt={selectedTenant.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#ffd662]"
                />
                <div>
                  <h3 className="text-xl font-bold text-black">{selectedTenant.fullName}</h3>
                  <p className="text-sm text-gray-600">{selectedTenant.propertyTitle}</p>
                </div>
              </div>

              {/* Información del contrato */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-black mb-3">Datos del Contrato</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Fecha de inicio</p>
                      <p className="text-sm font-medium text-black">
                        {new Date(selectedTenant.contractStart).toLocaleDateString('es-MX', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fecha de fin</p>
                      <p className="text-sm font-medium text-black">
                        {new Date(selectedTenant.contractEnd).toLocaleDateString('es-MX', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Estatus</p>
                      {getStatusBadge(selectedTenant.contractStatus)}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-black mb-3">Información Financiera</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Renta mensual</p>
                      <p className="text-lg font-bold text-black">
                        ${selectedTenant.contractDetails.monthlyRent.toLocaleString('es-MX')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Depósito</p>
                      <p className="text-sm font-medium text-black">
                        ${selectedTenant.contractDetails.deposit.toLocaleString('es-MX')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Método de pago</p>
                      <p className="text-sm font-medium text-black">
                        {selectedTenant.contractDetails.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Historial de pagos */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-black mb-4">Historial de Pagos</h4>
                <div className="space-y-2">
                  {selectedTenant.contractDetails.paymentHistory.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-black">{payment.month}</p>
                        {payment.date && (
                          <p className="text-xs text-gray-500">
                            Pagado el {new Date(payment.date).toLocaleDateString('es-MX')}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-black">
                          ${payment.amount.toLocaleString('es-MX')}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            payment.status === 'pagado'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {payment.status === 'pagado' ? 'Pagado' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentos */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-black mb-4">Documentos</h4>
                <div className="space-y-2">
                  {selectedTenant.contractDetails.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#ffd662]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="font-medium text-black">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {doc.status === 'firmado' ? 'Firmado' : 'Subido'} el{' '}
                            {new Date(doc.date).toLocaleDateString('es-MX')}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          doc.status === 'firmado'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {doc.status === 'firmado' ? 'Firmado' : 'Subido'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observaciones */}
              {selectedTenant.contractDetails.notes && (
                <div>
                  <h4 className="text-lg font-bold text-black mb-4">Observaciones</h4>
                  <div className="bg-yellow-50 border-l-4 border-[#ffd662] p-4 rounded">
                    <p className="text-sm text-gray-700">{selectedTenant.contractDetails.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTenants;
