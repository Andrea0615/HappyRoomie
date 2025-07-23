import React, { useState, useEffect } from 'react';

const SliderWithInput = ({
  min = 0,
  max = 10000,
  step = 500,
  value,
  onChange,
  label = '',
  currency = false,
  unit = '',
}) => {
  const [inputValue, setInputValue] = useState(value || min);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setInputValue(val);
    onChange(val);
  };

  const handleInputChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    val = val ? Number(val) : '';
    setInputValue(val);
    onChange(val);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      {label && <label className="block mb-2 font-medium text-black">{label}</label>}
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 text-lg text-center"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => {
          // Ajustar al rango permitido
          let val = inputValue;
          if (val < min) val = min;
          if (val > max) val = max;
          setInputValue(val);
          onChange(val);
        }}
        inputMode="numeric"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={inputValue >= min ? Math.round(inputValue / step) * step : min}
        onChange={handleSliderChange}
        className="w-full accent-[#ffd662]"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{currency ? `$${min.toLocaleString()}` : `${min}${unit}`}</span>
        <span>{currency ? `$${max.toLocaleString()}` : `${max}${unit}`}</span>
      </div>
    </div>
  );
};

export default SliderWithInput; 