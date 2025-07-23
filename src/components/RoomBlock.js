import React from 'react';
import MultiSelect from './MultiSelect';

const furnitureOptions = [
  { value: 'cama_individual', label: 'Cama individual', image: '/img/cama_individual.png' },
  { value: 'cama_matrimonial', label: 'Cama Matrimonial', image: '/img/cama_matrimonial.png' },
  { value: 'cama_queen', label: 'Cama Queen', image: '/img/cama_queen.png' },
  { value: 'cama_king', label: 'Cama King', image: '/img/cama_king.png' },
  { value: 'escritorio', label: 'Escritorio', image: '/img/escritorio.png' },
  { value: 'silla', label: 'Silla', image: '/img/silla.png' },
  { value: 'espejo', label: 'Espejo', image: '/img/espejo.png' },
  { value: 'armario', label: 'Armario', image: '/img/armario.png' },
  { value: 'cajones', label: 'Cajones', image: '/img/cajones.png' },
  { value: 'puff', label: 'Puff', image: '/img/puff.png' },
  { value: 'zapatera', label: 'Zapatera', image: '/img/zapatera.png' },
  { value: 'buro', label: 'Buró', image: '/img/buro.png' },
  { value: 'lampara', label: 'Lámpara', image: '/img/lampara.png' },
  { value: 'balcon', label: 'Balcón', image: '/img/balcon.png' },
  { value: 'cuadros', label: 'Cuadros/arte', image: '/img/cuadros.png' },
];

const RoomBlock = ({
  index,
  data,
  onChange,
}) => {
  const handleField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-6 mb-6 bg-white shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-black">Habitación {index + 1}</h3>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-black">¿La habitación está amueblada?</label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg border-2 font-medium ${data.amueblada === true ? 'border-[#ffd662] bg-yellow-50' : 'border-gray-200 bg-white'}`}
            onClick={() => handleField('amueblada', true)}
          >Sí</button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg border-2 font-medium ${data.amueblada === false ? 'border-[#ffd662] bg-yellow-50' : 'border-gray-200 bg-white'}`}
            onClick={() => handleField('amueblada', false)}
          >No</button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-black">Selecciona los muebles con los que cuenta la habitación</label>
        <MultiSelect
          options={furnitureOptions}
          value={data.muebles || []}
          onChange={(val) => handleField('muebles', val)}
          withImages
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-black">El baño de la habitación es...</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg"
          value={data.bano || ''}
          onChange={(e) => handleField('bano', e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="propio">Propio (Individual)</option>
          <option value="compartido">Compartido</option>
          <option value="compartido2">Compartido con 2</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-black">Comparte las fotos de la habitación</label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          onChange={(e) => handleField('fotos', Array.from(e.target.files))}
        />
      </div>
    </div>
  );
};

export default RoomBlock; 