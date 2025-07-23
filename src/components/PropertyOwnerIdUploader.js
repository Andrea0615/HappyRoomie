import React, { useState } from 'react';

const PropertyOwnerIdUploader = ({ onDocumentChange }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onDocumentChange(file);
    }
  };

  return (
    <div className="mb-6 font-['Poppins']">
      <label className="block text-black font-medium mb-2 font-['Poppins']">
        Identificación oficial
      </label>
      <div className="flex flex-col">
        <div className="bg-white p-4 border border-gray-200 rounded-lg mb-2 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span className="text-gray-700 truncate max-w-xs font-['Poppins']">
                {fileName || 'Ningún archivo seleccionado'}
              </span>
            </div>
            <label className="bg-[#ffd662] hover:bg-[#e6c52b] text-black font-medium py-2 px-4 rounded cursor-pointer transition-colors font-['Poppins'] shadow-sm">
              Subir ID
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,.pdf" 
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <p className="text-sm text-gray-600 font-['Poppins']">
          Sube tu INE, pasaporte o licencia de conducir para verificar tu identidad
        </p>
      </div>
    </div>
  );
};

export default PropertyOwnerIdUploader; 