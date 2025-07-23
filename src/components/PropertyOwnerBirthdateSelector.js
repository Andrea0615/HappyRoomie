import React, { useState, useEffect } from 'react';

const PropertyOwnerBirthdateSelector = ({ onBirthdateChange, onAgeChange }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);

  // Generar arrays para los selectores
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: 'Enero' }, { value: 2, label: 'Febrero' }, { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' }, { value: 5, label: 'Mayo' }, { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' }, { value: 8, label: 'Agosto' }, { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' }, { value: 11, label: 'Noviembre' }, { value: 12, label: 'Diciembre' }
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1924 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (day && month && year) {
      const birthdate = new Date(year, month - 1, day);
      onBirthdateChange(birthdate);
      
      // Calcular edad
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthdate.getFullYear();
      const monthDiff = today.getMonth() - birthdate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge);
      onAgeChange(calculatedAge);
    }
  }, [day, month, year, onBirthdateChange, onAgeChange]);

  return (
    <div className="mb-6 font-['Poppins']">
      <label className="block text-black font-medium mb-2 font-['Poppins']">
        Fecha de nacimiento
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex space-x-2">
          <select 
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-[#FFDC30] focus:border-[#FFDC30] block w-20 p-2.5 shadow-sm transition-all duration-200 hover:border-gray-400 font-['Poppins']"
          >
            <option value="">Día</option>
            {days.map(d => (
              <option key={`day-${d}`} value={d}>{d}</option>
            ))}
          </select>
          
          <select 
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-[#FFDC30] focus:border-[#FFDC30] block w-32 p-2.5 shadow-sm transition-all duration-200 hover:border-gray-400 font-['Poppins']"
          >
            <option value="">Mes</option>
            {months.map(m => (
              <option key={`month-${m.value}`} value={m.value}>{m.label}</option>
            ))}
          </select>
          
          <select 
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-[#FFDC30] focus:border-[#FFDC30] block w-28 p-2.5 shadow-sm transition-all duration-200 hover:border-gray-400 font-['Poppins']"
          >
            <option value="">Año</option>
            {years.map(y => (
              <option key={`year-${y}`} value={y}>{y}</option>
            ))}
          </select>
        </div>
        
        {age !== null && (
          <div className="flex items-center bg-[#FFDC30] px-3 py-1 rounded-full shadow-sm">
            <span className="text-black font-medium font-['Poppins']">{age} años</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyOwnerBirthdateSelector; 