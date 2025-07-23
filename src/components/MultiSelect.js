import React from 'react';

const MultiSelect = ({ options, value = [], onChange, withImages = false }) => {
  const handleToggle = (option) => {
    if (value.includes(option.value)) {
      onChange(value.filter((v) => v !== option.value));
    } else {
      onChange([...value, option.value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`flex items-center border-2 rounded-lg px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-lg focus:outline-none ${
            value.includes(opt.value) ? 'border-[#FFDC30] bg-yellow-50' : 'border-gray-200 bg-white'
          }`}
          onClick={() => handleToggle(opt)}
        >
          {withImages && opt.image && (
            <img src={opt.image} alt={opt.label} className="w-8 h-8 object-contain mr-2" />
          )}
          <span className="font-medium text-black">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MultiSelect; 