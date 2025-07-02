import React, { useRef, useEffect } from 'react';

const GoogleMapsAutocomplete = ({ value, onChange }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (!window.google) return;
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
      componentRestrictions: { country: 'mx' },
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onChange({
        address: place.formatted_address,
        location: place.geometry?.location?.toJSON?.() || null,
      });
    });
  }, [onChange]);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-black">Selecciona la ubicación (Google Maps)</label>
      <input
        ref={inputRef}
        type="text"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg"
        placeholder="Busca o selecciona tu ubicación..."
        defaultValue={value?.address || ''}
      />
      {value?.location && (
        <div className="mt-2 text-xs text-gray-600">
          Ubicación seleccionada: {value.location.lat}, {value.location.lng}
        </div>
      )}
    </div>
  );
};

export default GoogleMapsAutocomplete; 