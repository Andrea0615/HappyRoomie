import React, { useState } from 'react';
import { requests, offers } from '../mock/requests';

const MyRequests = ({ onNavigate }) => {
  // Pestaña principal: Solicitudes u Ofertas
  const [mainTab, setMainTab] = useState('solicitudes');
  
  // Sub-pestañas para Solicitudes
  const [requestTab, setRequestTab] = useState('pendientes');
  
  // Sub-pestañas para Ofertas
  const [offerTab, setOfferTab] = useState('en_proceso');
  
  // Estado para ordenamiento
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' o 'desc'
  
  // Estado para modales
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(null);
  const [counterOfferPrice, setCounterOfferPrice] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null); // { type: 'request' | 'offer', id: number }
  const [selectedRejectReason, setSelectedRejectReason] = useState('');

  // Razones predeterminadas para rechazar
  const requestRejectReasons = [
    'El perfil no hace match con los roomies actuales',
    'Los valores no están alineados',
    'Pocas o malas reseñas de otros anfitriones',
    'Sospecha de fiestas o mal uso del alojamiento',
    'La habitación/casa fue reservada por fuera de la aplicación'
  ];

  const offerRejectReasons = [
    'Oferta muy baja',
    'Oferta inaceptable',
    'Prefiero no decir'
  ];

  // Filtrar solicitudes por estado
  const filteredRequests = requests.filter(req => {
    if (requestTab === 'pendientes') return req.status === 'pendiente';
    if (requestTab === 'aceptadas') return req.status === 'aceptada';
    if (requestTab === 'rechazadas') return req.status === 'rechazada';
    return false;
  });

  // Filtrar ofertas por estado
  const filteredOffers = offers.filter(offer => {
    if (offerTab === 'en_proceso') return offer.status === 'en_proceso';
    if (offerTab === 'rechazadas') return offer.status === 'rechazada';
    if (offerTab === 'aceptadas') return offer.status === 'aceptada';
    if (offerTab === 'todas') return true;
    return false;
  });

  // Ordenar por fecha
  const sortByDate = (items, order) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.requestDate || a.offerDate);
      const dateB = new Date(b.requestDate || b.offerDate);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const sortedRequests = sortByDate(filteredRequests, sortOrder);
  const sortedOffers = sortByDate(filteredOffers, sortOrder);

  const handleAcceptRequest = (requestId) => {
    console.log('Aceptar solicitud:', requestId);
    // Aquí iría la lógica para aceptar la solicitud
  };

  const handleRejectRequest = (requestId) => {
    setShowRejectModal({ type: 'request', id: requestId });
    setSelectedRejectReason('');
  };

  const handleAcceptOffer = (offerId) => {
    console.log('Aceptar oferta:', offerId);
    // Aquí iría la lógica para aceptar la oferta
  };

  const handleRejectOffer = (offerId) => {
    setShowRejectModal({ type: 'offer', id: offerId });
    setSelectedRejectReason('');
  };

  const handleConfirmReject = () => {
    if (!showRejectModal || !selectedRejectReason) {
      alert('Por favor selecciona una razón para el rechazo');
      return;
    }

    if (showRejectModal.type === 'request') {
      console.log('Rechazar solicitud:', {
        requestId: showRejectModal.id,
        reason: selectedRejectReason
      });
      // Aquí iría la lógica para rechazar la solicitud con la razón
    } else {
      console.log('Rechazar oferta:', {
        offerId: showRejectModal.id,
        reason: selectedRejectReason
      });
      // Aquí iría la lógica para rechazar la oferta con la razón
    }

    setShowRejectModal(null);
    setSelectedRejectReason('');
  };

  const handleCounterOffer = (offer) => {
    if (offer.counterOffers.length >= 2) {
      alert('Ya has realizado el máximo de contraofertas (2)');
      return;
    }
    setShowCounterOfferModal(offer);
    setCounterOfferPrice('');
  };

  const handleSubmitCounterOffer = () => {
    if (!showCounterOfferModal || !counterOfferPrice) return;
    
    const price = parseFloat(counterOfferPrice);
    if (isNaN(price) || price <= 0) {
      alert('Por favor ingresa un precio válido');
      return;
    }

    console.log('Enviar contraoferta:', {
      offerId: showCounterOfferModal.id,
      price: price
    });
    
    // Aquí iría la lógica para enviar la contraoferta
    setShowCounterOfferModal(null);
    setCounterOfferPrice('');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Mis Solicitudes</h1>
          <p className="mt-2 text-lg text-gray-600">
            Gestiona las solicitudes y ofertas de tus propiedades
          </p>
        </div>

        {/* Pestañas principales */}
        <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
          <button
            onClick={() => setMainTab('solicitudes')}
            className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
              mainTab === 'solicitudes'
                ? 'border-[#ffd662] text-black bg-yellow-50'
                : 'border-transparent text-gray-600 hover:text-black'
            }`}
          >
            Solicitudes
          </button>
          <button
            onClick={() => setMainTab('ofertas')}
            className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
              mainTab === 'ofertas'
                ? 'border-[#ffd662] text-black bg-yellow-50'
                : 'border-transparent text-gray-600 hover:text-black'
            }`}
          >
            Ofertas
          </button>
        </div>

        {/* Sección de Solicitudes */}
        {mainTab === 'solicitudes' && (
          <div>
            {/* Sub-pestañas y ordenamiento */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 border-b border-gray-200">
                <button
                  onClick={() => setRequestTab('pendientes')}
                  className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                    requestTab === 'pendientes'
                      ? 'border-[#ffd662] text-black bg-yellow-50'
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  Pendientes ({requests.filter(r => r.status === 'pendiente').length})
                </button>
                <button
                  onClick={() => setRequestTab('aceptadas')}
                  className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                    requestTab === 'aceptadas'
                      ? 'border-[#ffd662] text-black bg-yellow-50'
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  Aceptadas ({requests.filter(r => r.status === 'aceptada').length})
                </button>
                <button
                  onClick={() => setRequestTab('rechazadas')}
                  className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                    requestTab === 'rechazadas'
                      ? 'border-[#ffd662] text-black bg-yellow-50'
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  Rechazadas ({requests.filter(r => r.status === 'rechazada').length})
                </button>
              </div>
              
              {/* Selector de ordenamiento */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por fecha:</span>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-4 py-2 bg-gray-100 text-black rounded-md font-semibold hover:bg-gray-200 transition duration-300 text-sm flex items-center gap-2"
                >
                  {sortOrder === 'asc' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Ascendente
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Descendente
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Grid de tarjetas de solicitudes */}
            {sortedRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedRequests.map(request => (
                  <div
                    key={request.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={request.propertyImage}
                        alt={request.propertyTitle}
                        className="w-full h-48 object-cover"
                      />
                      <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        request.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'aceptada' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status === 'pendiente' ? 'Pendiente' :
                         request.status === 'aceptada' ? 'Aceptada' : 'Rechazada'}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black truncate mb-2">{request.propertyTitle}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">{request.student.name}</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(request.requestDate).toLocaleDateString('es-MX')}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-black">${request.propertyPrice.toLocaleString('es-MX')}</span>
                        <span className="text-sm text-gray-600">/mes</span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="flex-1 px-3 py-2 bg-[#ffd662] text-black rounded font-medium hover:bg-yellow-400 transition duration-300 text-sm"
                        >
                          Ver detalles
                        </button>
                        {request.status === 'pendiente' && (
                          <>
                            <button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="px-3 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition duration-300 text-sm"
                            >
                              Aceptar
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.id)}
                              className="px-3 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition duration-300 text-sm"
                            >
                              Rechazar
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No hay solicitudes {requestTab}.</p>
              </div>
            )}
          </div>
        )}

        {/* Sección de Ofertas */}
        {mainTab === 'ofertas' && (
          <div>
            {/* Sub-pestañas y ordenamiento */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 border-b border-gray-200">
                <button
                  onClick={() => setOfferTab('en_proceso')}
                  className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                    offerTab === 'en_proceso'
                      ? 'border-[#ffd662] text-black bg-yellow-50'
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  En proceso ({offers.filter(o => o.status === 'en_proceso').length})
                </button>
                <button
                  onClick={() => setOfferTab('rechazadas')}
                  className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                    offerTab === 'rechazadas'
                      ? 'border-[#ffd662] text-black bg-yellow-50'
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  Rechazadas ({offers.filter(o => o.status === 'rechazada').length})
                </button>
                <button
                  onClick={() => setOfferTab('aceptadas')}
                  className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                    offerTab === 'aceptadas'
                      ? 'border-[#ffd662] text-black bg-yellow-50'
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  Aceptadas ({offers.filter(o => o.status === 'aceptada').length})
                </button>
                <button
                  onClick={() => setOfferTab('todas')}
                  className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                    offerTab === 'todas'
                      ? 'border-[#ffd662] text-black bg-yellow-50'
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  Todas ({offers.length})
                </button>
              </div>
              
              {/* Selector de ordenamiento */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por fecha:</span>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-4 py-2 bg-gray-100 text-black rounded-md font-semibold hover:bg-gray-200 transition duration-300 text-sm flex items-center gap-2"
                >
                  {sortOrder === 'asc' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Ascendente
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Descendente
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Grid de tarjetas de ofertas */}
            {sortedOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedOffers.map(offer => (
                  <div
                    key={offer.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={offer.propertyImage}
                        alt={offer.propertyTitle}
                        className="w-full h-48 object-cover"
                      />
                      <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        offer.status === 'en_proceso' ? 'bg-yellow-100 text-yellow-800' :
                        offer.status === 'aceptada' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {offer.status === 'en_proceso' ? (offer.isCounterOffer ? 'Contraoferta' : 'En proceso') :
                         offer.status === 'aceptada' ? 'Aceptada' : 'Rechazada'}
                      </span>
                      {offer.isCounterOffer && offer.status === 'en_proceso' && (
                        <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md">
                          Contraoferta activa
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black truncate mb-2">{offer.propertyTitle}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">{offer.student.name}</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(offer.offerDate).toLocaleDateString('es-MX')}
                      </p>
                      
                      {/* Precios */}
                      <div className="mb-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Precio original</span>
                          <span className="text-sm font-semibold text-gray-700 line-through">
                            ${offer.originalPrice.toLocaleString('es-MX')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Precio ofertado</span>
                          <span className="text-lg font-bold text-[#ffd662]">
                            ${offer.offeredPrice.toLocaleString('es-MX')}
                          </span>
                        </div>
                        {offer.counterOffers.length > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Última contraoferta</span>
                            <span className="text-sm font-semibold text-blue-600">
                              ${offer.counterOffers[offer.counterOffers.length - 1].price.toLocaleString('es-MX')}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2 flex-wrap">
                        <button
                          onClick={() => setSelectedOffer(offer)}
                          className="flex-1 px-3 py-2 bg-[#ffd662] text-black rounded font-medium hover:bg-yellow-400 transition duration-300 text-sm"
                        >
                          Ver detalles
                        </button>
                        {offer.status === 'en_proceso' && (
                          <>
                            <button
                              onClick={() => handleAcceptOffer(offer.id)}
                              className="px-3 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition duration-300 text-sm"
                            >
                              Aceptar
                            </button>
                            <button
                              onClick={() => handleRejectOffer(offer.id)}
                              className="px-3 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition duration-300 text-sm"
                            >
                              Rechazar
                            </button>
                            <button
                              onClick={() => handleCounterOffer(offer)}
                              disabled={offer.counterOffers.length >= 2}
                              className={`flex-1 px-3 py-2 rounded font-medium transition duration-300 text-sm ${
                                offer.counterOffers.length >= 2
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}
                            >
                              Contraoferta {offer.counterOffers.length > 0 && `(${offer.counterOffers.length}/2)`}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No hay ofertas {offerTab === 'todas' ? '' : offerTab}.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal de detalles de solicitud */}
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-black">Detalles de la Solicitud</h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-black transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {/* Información de la propiedad */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-black mb-3">Propiedad</h4>
                  <div className="flex gap-4">
                    <img
                      src={selectedRequest.propertyImage}
                      alt={selectedRequest.propertyTitle}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div>
                      <h5 className="text-lg font-semibold text-black">{selectedRequest.propertyTitle}</h5>
                      <p className="text-lg font-bold text-black mt-2">
                        ${selectedRequest.propertyPrice.toLocaleString('es-MX')}/mes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información del estudiante */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-black mb-3">Información del Estudiante</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={selectedRequest.student.profilePhoto}
                      alt={selectedRequest.student.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#ffd662]"
                    />
                    <div>
                      <h5 className="text-xl font-bold text-black">{selectedRequest.student.name}</h5>
                      <p className="text-gray-600">{selectedRequest.student.major}</p>
                      <p className="text-sm text-gray-500">{selectedRequest.student.university}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h6 className="font-semibold text-black mb-3">Información Personal</h6>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-500">Edad:</span> <span className="font-medium ml-2">{selectedRequest.student.age} años</span></p>
                        <p><span className="text-gray-500">Matrícula:</span> <span className="font-medium ml-2">{selectedRequest.student.studentId}</span></p>
                        <p><span className="text-gray-500">Correo:</span> <span className="font-medium ml-2">{selectedRequest.student.email}</span></p>
                        <p><span className="text-gray-500">Teléfono:</span> <span className="font-medium ml-2">{selectedRequest.student.phone}</span></p>
                      </div>
                    </div>
                    <div>
                      <h6 className="font-semibold text-black mb-3">Dirección</h6>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">{selectedRequest.student.address}</p>
                        <p className="text-gray-600">{selectedRequest.student.city}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mensaje */}
                {selectedRequest.message && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h6 className="font-semibold text-black mb-2">Mensaje del estudiante</h6>
                    <p className="text-sm text-gray-700">{selectedRequest.message}</p>
                  </div>
                )}

                {/* Fecha de solicitud */}
                <div className="mt-4 text-sm text-gray-500">
                  Solicitud realizada el {new Date(selectedRequest.requestDate).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de detalles de oferta */}
        {selectedOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-black">Detalles de la Oferta</h3>
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="text-gray-500 hover:text-black transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {/* Información de la propiedad */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-black mb-3">Propiedad</h4>
                  <div className="flex gap-4">
                    <img
                      src={selectedOffer.propertyImage}
                      alt={selectedOffer.propertyTitle}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div>
                      <h5 className="text-lg font-semibold text-black">{selectedOffer.propertyTitle}</h5>
                      <p className="text-sm text-gray-500 line-through mt-1">
                        Precio original: ${selectedOffer.originalPrice.toLocaleString('es-MX')}/mes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Historial de ofertas */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-black mb-3">Historial de Ofertas</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Oferta inicial</p>
                      <p className="text-lg font-bold text-[#ffd662]">
                        ${selectedOffer.offeredPrice.toLocaleString('es-MX')}/mes
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(selectedOffer.offerDate).toLocaleDateString('es-MX')}
                      </p>
                    </div>
                    {selectedOffer.counterOffers.map((counter, idx) => (
                      <div key={counter.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-xs text-gray-500 mb-1">Contraoferta {idx + 1}</p>
                        <p className="text-lg font-bold text-blue-600">
                          ${counter.price.toLocaleString('es-MX')}/mes
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(counter.date).toLocaleDateString('es-MX')}
                        </p>
                        {counter.message && (
                          <p className="text-xs text-gray-600 mt-2">{counter.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información del estudiante */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-black mb-3">Información del Estudiante</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={selectedOffer.student.profilePhoto}
                      alt={selectedOffer.student.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#ffd662]"
                    />
                    <div>
                      <h5 className="text-xl font-bold text-black">{selectedOffer.student.name}</h5>
                      <p className="text-gray-600">{selectedOffer.student.major}</p>
                      <p className="text-sm text-gray-500">{selectedOffer.student.university}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h6 className="font-semibold text-black mb-3">Información Personal</h6>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-500">Edad:</span> <span className="font-medium ml-2">{selectedOffer.student.age} años</span></p>
                        <p><span className="text-gray-500">Matrícula:</span> <span className="font-medium ml-2">{selectedOffer.student.studentId}</span></p>
                        <p><span className="text-gray-500">Correo:</span> <span className="font-medium ml-2">{selectedOffer.student.email}</span></p>
                        <p><span className="text-gray-500">Teléfono:</span> <span className="font-medium ml-2">{selectedOffer.student.phone}</span></p>
                      </div>
                    </div>
                    {selectedOffer.student.address && (
                      <div>
                        <h6 className="font-semibold text-black mb-3">Dirección</h6>
                        <div className="space-y-2 text-sm">
                          <p className="font-medium">{selectedOffer.student.address}</p>
                          <p className="text-gray-600">{selectedOffer.student.city}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mensaje */}
                {selectedOffer.message && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h6 className="font-semibold text-black mb-2">Mensaje del estudiante</h6>
                    <p className="text-sm text-gray-700">{selectedOffer.message}</p>
                  </div>
                )}

                {/* Fecha de oferta */}
                <div className="mt-4 text-sm text-gray-500">
                  Oferta realizada el {new Date(selectedOffer.offerDate).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de contraoferta */}
        {showCounterOfferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-black mb-4">Hacer Contraoferta</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-black mb-2">
                  Precio mensual propuesto
                </label>
                <div className="mb-2 space-y-1">
                  <p className="text-xs text-gray-500">Precio original: ${showCounterOfferModal.originalPrice.toLocaleString('es-MX')}</p>
                  <p className="text-xs text-gray-500">Última oferta: ${showCounterOfferModal.offeredPrice.toLocaleString('es-MX')}</p>
                  {showCounterOfferModal.counterOffers.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Última contraoferta: ${showCounterOfferModal.counterOffers[showCounterOfferModal.counterOffers.length - 1].price.toLocaleString('es-MX')}
                    </p>
                  )}
                </div>
                <input
                  type="number"
                  value={counterOfferPrice}
                  onChange={(e) => setCounterOfferPrice(e.target.value)}
                  placeholder="Ingresa el precio"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662]"
                  min={showCounterOfferModal.offeredPrice}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Contraofertas realizadas: {showCounterOfferModal.counterOffers.length}/2
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCounterOfferModal(null);
                    setCounterOfferPrice('');
                  }}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitCounterOffer}
                  className="flex-1 px-4 py-2 bg-[#ffd662] text-black rounded-md font-semibold hover:bg-yellow-400 transition duration-300"
                >
                  Enviar contraoferta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de rechazo */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-black mb-4">
                {showRejectModal.type === 'request' ? 'Rechazar Solicitud' : 'Rechazar Oferta'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Por favor selecciona una razón para el rechazo:
              </p>
              
              <div className="mb-4 space-y-2 max-h-64 overflow-y-auto">
                {(showRejectModal.type === 'request' ? requestRejectReasons : offerRejectReasons).map((reason, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition duration-300 ${
                      selectedRejectReason === reason
                        ? 'border-[#ffd662] bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rejectReason"
                      value={reason}
                      checked={selectedRejectReason === reason}
                      onChange={(e) => setSelectedRejectReason(e.target.value)}
                      className="mr-3 w-4 h-4 text-[#ffd662] focus:ring-[#ffd662]"
                    />
                    <span className="text-sm text-black">{reason}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(null);
                    setSelectedRejectReason('');
                  }}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmReject}
                  disabled={!selectedRejectReason}
                  className={`flex-1 px-4 py-2 rounded-md font-semibold transition duration-300 ${
                    selectedRejectReason
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirmar rechazo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
