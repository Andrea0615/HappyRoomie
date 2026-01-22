import React, { useState } from 'react';
import { requests, offers } from '../mock/requests';

const MyRequests = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('pendientes'); // pendientes, aceptadas, rechazadas
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(null);
  const [counterOfferPrice, setCounterOfferPrice] = useState('');

  // Filtrar solicitudes por estado
  const filteredRequests = requests.filter(req => {
    if (activeTab === 'pendientes') return req.status === 'pendiente';
    if (activeTab === 'aceptadas') return req.status === 'aceptada';
    if (activeTab === 'rechazadas') return req.status === 'rechazada';
    return false;
  });

  const handleAcceptRequest = (requestId) => {
    console.log('Aceptar solicitud:', requestId);
    // Aquí iría la lógica para aceptar la solicitud
  };

  const handleRejectRequest = (requestId) => {
    console.log('Rechazar solicitud:', requestId);
    // Aquí iría la lógica para rechazar la solicitud
  };

  const handleAcceptOffer = (offerId) => {
    console.log('Aceptar oferta:', offerId);
    // Aquí iría la lógica para aceptar la oferta
  };

  const handleRejectOffer = (offerId) => {
    console.log('Rechazar oferta:', offerId);
    // Aquí iría la lógica para rechazar la oferta
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

  const toggleRequestExpansion = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const toggleOfferExpansion = (offerId) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
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

        {/* Sección 1: Solicitudes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">Solicitudes</h2>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pendientes')}
              className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                activeTab === 'pendientes'
                  ? 'border-[#ffd662] text-black bg-yellow-50'
                  : 'border-transparent text-gray-600 hover:text-black'
              }`}
            >
              Pendientes ({requests.filter(r => r.status === 'pendiente').length})
            </button>
            <button
              onClick={() => setActiveTab('aceptadas')}
              className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                activeTab === 'aceptadas'
                  ? 'border-[#ffd662] text-black bg-yellow-50'
                  : 'border-transparent text-gray-600 hover:text-black'
              }`}
            >
              Aceptadas ({requests.filter(r => r.status === 'aceptada').length})
            </button>
            <button
              onClick={() => setActiveTab('rechazadas')}
              className={`px-6 py-3 font-semibold transition duration-300 border-b-2 ${
                activeTab === 'rechazadas'
                  ? 'border-[#ffd662] text-black bg-yellow-50'
                  : 'border-transparent text-gray-600 hover:text-black'
              }`}
            >
              Rechazadas ({requests.filter(r => r.status === 'rechazada').length})
            </button>
          </div>

          {/* Lista de solicitudes */}
          {filteredRequests.length > 0 ? (
            <div className="space-y-4">
              {filteredRequests.map(request => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  {/* Tarjeta básica */}
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={request.propertyImage}
                        alt={request.propertyTitle}
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-black">{request.propertyTitle}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="font-semibold">{request.student.name}</span> quiere rentar esta propiedad
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Solicitud del {new Date(request.requestDate).toLocaleDateString('es-MX')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'aceptada' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status === 'pendiente' ? 'Pendiente' :
                             request.status === 'aceptada' ? 'Aceptada' : 'Rechazada'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Botón Ver más detalles */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => toggleRequestExpansion(request.id)}
                        className="px-4 py-2 bg-gray-100 text-black rounded-md font-semibold hover:bg-gray-200 transition duration-300 text-sm"
                      >
                        {expandedRequest === request.id ? 'Ocultar detalles' : 'Ver más detalles'}
                      </button>
                      {request.status === 'pendiente' && (
                        <>
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 text-sm"
                          >
                            Aceptar
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300 text-sm"
                          >
                            Rechazar
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Perfil expandido */}
                  {expandedRequest === request.id && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={request.student.profilePhoto}
                          alt={request.student.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-[#ffd662]"
                        />
                        <div>
                          <h4 className="text-xl font-bold text-black">{request.student.name}</h4>
                          <p className="text-gray-600">{request.student.major}</p>
                          <p className="text-sm text-gray-500">{request.student.university}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="font-semibold text-black mb-3">Información Personal</h5>
                          <div className="space-y-2 text-sm">
                            <p><span className="text-gray-500">Edad:</span> <span className="font-medium">{request.student.age} años</span></p>
                            <p><span className="text-gray-500">Matrícula:</span> <span className="font-medium">{request.student.studentId}</span></p>
                            <p><span className="text-gray-500">Correo:</span> <span className="font-medium">{request.student.email}</span></p>
                            <p><span className="text-gray-500">Teléfono:</span> <span className="font-medium">{request.student.phone}</span></p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-black mb-3">Dirección</h5>
                          <div className="space-y-2 text-sm">
                            <p className="font-medium">{request.student.address}</p>
                            <p className="text-gray-600">{request.student.city}</p>
                          </div>
                        </div>
                      </div>

                      {request.message && (
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-semibold text-black mb-2">Mensaje del estudiante</h5>
                          <p className="text-sm text-gray-700">{request.message}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No hay solicitudes {activeTab}.</p>
            </div>
          )}
        </div>

        {/* Sección 2: Ofertas */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Ofertas</h2>

          {offers.length > 0 ? (
            <div className="space-y-4">
              {offers.map(offer => (
                <div
                  key={offer.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  {/* Tarjeta básica */}
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={offer.propertyImage}
                        alt={offer.propertyTitle}
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-black">{offer.propertyTitle}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="font-semibold">{offer.student.name}</span> hizo una oferta
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div>
                                <p className="text-xs text-gray-500">Precio original</p>
                                <p className="text-sm font-semibold text-gray-700 line-through">
                                  ${offer.originalPrice.toLocaleString('es-MX')}/mes
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Precio ofertado</p>
                                <p className="text-lg font-bold text-[#ffd662]">
                                  ${offer.offeredPrice.toLocaleString('es-MX')}/mes
                                </p>
                              </div>
                              {offer.counterOffers.length > 0 && (
                                <div>
                                  <p className="text-xs text-gray-500">Última contraoferta</p>
                                  <p className="text-sm font-semibold text-blue-600">
                                    ${offer.counterOffers[offer.counterOffers.length - 1].price.toLocaleString('es-MX')}/mes
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            offer.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                            offer.status === 'aceptada' ? 'bg-green-100 text-green-800' :
                            offer.status === 'rechazada' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {offer.status === 'pendiente' ? 'Pendiente' :
                             offer.status === 'aceptada' ? 'Aceptada' :
                             offer.status === 'rechazada' ? 'Rechazada' : 'Contraoferta'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <button
                        onClick={() => toggleOfferExpansion(offer.id)}
                        className="px-4 py-2 bg-gray-100 text-black rounded-md font-semibold hover:bg-gray-200 transition duration-300 text-sm"
                      >
                        {expandedOffer === offer.id ? 'Ocultar detalles' : 'Ver más detalles'}
                      </button>
                      {offer.status !== 'aceptada' && offer.status !== 'rechazada' && (
                        <>
                          <button
                            onClick={() => handleAcceptOffer(offer.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 text-sm"
                          >
                            Aceptar oferta
                          </button>
                          <button
                            onClick={() => handleRejectOffer(offer.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300 text-sm"
                          >
                            Rechazar oferta
                          </button>
                          <button
                            onClick={() => handleCounterOffer(offer)}
                            disabled={offer.counterOffers.length >= 2}
                            className={`px-4 py-2 rounded-md font-semibold transition duration-300 text-sm ${
                              offer.counterOffers.length >= 2
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#ffd662] text-black hover:bg-yellow-400'
                            }`}
                          >
                            Hacer contraoferta {offer.counterOffers.length > 0 && `(${offer.counterOffers.length}/2)`}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Perfil expandido */}
                  {expandedOffer === offer.id && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={offer.student.profilePhoto}
                          alt={offer.student.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-[#ffd662]"
                        />
                        <div>
                          <h4 className="text-xl font-bold text-black">{offer.student.name}</h4>
                          <p className="text-gray-600">{offer.student.major}</p>
                          <p className="text-sm text-gray-500">{offer.student.university}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="font-semibold text-black mb-3">Información Personal</h5>
                          <div className="space-y-2 text-sm">
                            <p><span className="text-gray-500">Edad:</span> <span className="font-medium">{offer.student.age} años</span></p>
                            <p><span className="text-gray-500">Matrícula:</span> <span className="font-medium">{offer.student.studentId}</span></p>
                            <p><span className="text-gray-500">Correo:</span> <span className="font-medium">{offer.student.email}</span></p>
                            <p><span className="text-gray-500">Teléfono:</span> <span className="font-medium">{offer.student.phone}</span></p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-black mb-3">Historial de Ofertas</h5>
                          <div className="space-y-2 text-sm">
                            <div className="bg-white rounded p-2 border border-gray-200">
                              <p className="text-gray-500">Oferta inicial</p>
                              <p className="font-semibold">${offer.offeredPrice.toLocaleString('es-MX')}/mes</p>
                            </div>
                            {offer.counterOffers.map((counter, idx) => (
                              <div key={counter.id} className="bg-blue-50 rounded p-2 border border-blue-200">
                                <p className="text-gray-500">Contraoferta {idx + 1}</p>
                                <p className="font-semibold text-blue-600">${counter.price.toLocaleString('es-MX')}/mes</p>
                                <p className="text-xs text-gray-500">{new Date(counter.date).toLocaleDateString('es-MX')}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {offer.message && (
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-semibold text-black mb-2">Mensaje del estudiante</h5>
                          <p className="text-sm text-gray-700">{offer.message}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No hay ofertas pendientes.</p>
            </div>
          )}
        </div>

        {/* Modal de contraoferta */}
        {showCounterOfferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-black mb-4">Hacer Contraoferta</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-black mb-2">
                  Precio mensual propuesto
                </label>
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Precio original: ${showCounterOfferModal.originalPrice.toLocaleString('es-MX')}</p>
                  <p className="text-xs text-gray-500">Última oferta: ${showCounterOfferModal.offeredPrice.toLocaleString('es-MX')}</p>
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
      </div>
    </div>
  );
};

export default MyRequests;
