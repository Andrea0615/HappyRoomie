import React from 'react';

const ComboBox = ({ label, min = 1, max = 5, value, onChange, unit = '' }) => (
  <div className="mb-4">
    {label && <label className="block mb-2 font-medium text-black">{label}</label>}
    <select
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
        <option key={num} value={num}>{num} {unit}</option>
      ))}
    </select>
  </div>
);

export default ComboBox; 