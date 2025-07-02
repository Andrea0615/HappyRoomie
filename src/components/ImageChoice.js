import React from 'react';

const ImageChoice = ({ options, value, onChange, name }) => (
  <div className="flex flex-wrap gap-4 justify-center">
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        className={`flex flex-col items-center border-2 rounded-lg p-4 w-36 h-40 transition-all duration-200 shadow-sm hover:shadow-lg focus:outline-none ${
          value === opt.value ? 'border-[#FFDC30] bg-yellow-50' : 'border-gray-200 bg-white'
        }`}
        onClick={() => onChange(opt.value)}
        name={name}
      >
        <img src={opt.image} alt={opt.label} className="w-16 h-16 object-contain mb-2" />
        <span className="font-semibold text-black text-center">{opt.label}</span>
      </button>
    ))}
  </div>
);

export default ImageChoice; 