import React, { useState } from 'react';

const PropertyOwnerPhotoUploader = ({ onPhotoChange }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onPhotoChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6 font-['Poppins']">
      <label className="block text-black font-medium mb-2 font-['Poppins']">
        Foto de perfil
      </label>
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-[#ffd662] shadow-md">
          {preview ? (
            <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
        <div>
          <label className="bg-[#ffd662] hover:bg-[#e6c52b] text-black font-medium py-2 px-4 rounded cursor-pointer transition-colors font-['Poppins'] shadow-sm">
            Subir foto
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </label>
          <p className="text-sm text-gray-600 mt-2 font-['Poppins']">
            Esta foto será visible cuando un estudiante aplique a tu propiedad
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyOwnerPhotoUploader; 