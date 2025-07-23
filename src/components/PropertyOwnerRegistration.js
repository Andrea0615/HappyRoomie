import React, { useState, useEffect } from 'react';
import PropertyOwnerHeader from './PropertyOwnerHeader';
import PropertyOwnerPhotoUploader from './PropertyOwnerPhotoUploader';
import PropertyOwnerIdUploader from './PropertyOwnerIdUploader';
import PropertyOwnerBirthdateSelector from './PropertyOwnerBirthdateSelector';
import PropertyOwnerGenderSelector from './PropertyOwnerGenderSelector';
import PropertyQuestionnaire from './PropertyQuestionnaire';

const PropertyOwnerRegistration = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('profile');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [idDocument, setIdDocument] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Aplicar Poppins a todo el documento
  useEffect(() => {
    // Agregar la fuente Poppins desde Google Fonts si no está ya en el documento
    if (!document.getElementById('poppins-font')) {
      const link = document.createElement('link');
      link.id = 'poppins-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    
    // Aplicar la fuente Poppins al body y a todos los elementos
    document.body.style.fontFamily = "'Poppins', sans-serif";
    
    // Agregar una regla CSS global para aplicar Poppins a todos los elementos
    const style = document.createElement('style');
    style.textContent = `
      * {
        font-family: 'Poppins', sans-serif !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Limpiar al desmontar
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Verificar si el formulario es válido
  useEffect(() => {
    if (profilePhoto && idDocument && birthdate && gender) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [profilePhoto, idDocument, birthdate, gender]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setFormError('Por favor completa todos los campos requeridos');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular guardado de datos
    setTimeout(() => {
      // Guardar datos en localStorage
      const userData = {
        profilePhoto: profilePhoto ? URL.createObjectURL(profilePhoto) : null,
        idDocument: idDocument ? idDocument.name : null,
        birthdate,
        age,
        gender
      };
      
      localStorage.setItem('propertyOwnerData', JSON.stringify(userData));
      
      // Cambiar a la vista de propiedades
      setCurrentView('propertyQuestionnaire');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleQuestionnaireComplete = (answers) => {
    // Guardar las respuestas del cuestionario
    const propertyData = {
      ...JSON.parse(localStorage.getItem('propertyOwnerData') || '{}'),
      propertyAnswers: answers
    };
    localStorage.setItem('propertyOwnerData', JSON.stringify(propertyData));
    
    setCurrentView('propertyRegistered');
  };

  // Vista de propiedades registradas
  if (currentView === 'propertyRegistered') {
    return (
      <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
        <div className="w-full bg-[#FFDC30] py-6 px-4 shadow-md">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-black font-['Poppins']">¡Propiedad Registrada!</h1>
            <p className="text-black mt-2 font-['Poppins']">
              Tu propiedad ha sido registrada con éxito.
            </p>
          </div>
        </div>
        
        <main className="flex-grow max-w-4xl mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#FFDC30] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mt-4 font-['Poppins'] text-gray-900">¡Felicidades!</h2>
              <p className="mt-2 text-gray-600 font-['Poppins'] mb-6">
                Tu propiedad está lista para ser descubierta por estudiantes.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => setCurrentView('profile')}
                  className="bg-[#FFDC30] hover:bg-[#e6c52b] text-black font-medium py-3 px-6 rounded-lg transition-colors font-['Poppins'] mr-3"
                >
                  Registrar otra propiedad
                </button>
                <button 
                  onClick={onBack}
                  className="border-2 border-[#FFDC30] text-black font-medium py-3 px-6 rounded-lg hover:bg-yellow-50 transition-colors font-['Poppins']"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Vista del cuestionario de propiedades
  if (currentView === 'propertyQuestionnaire') {
    return (
      <PropertyQuestionnaire 
        onComplete={handleQuestionnaireComplete} 
        onBackToProfile={() => setCurrentView('profile')} 
      />
    );
  }

  // Vista de perfil (formulario principal)
  return (
    <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      <PropertyOwnerHeader />
      
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit}>
            <PropertyOwnerPhotoUploader onPhotoChange={setProfilePhoto} />
            
            <PropertyOwnerIdUploader onDocumentChange={setIdDocument} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PropertyOwnerBirthdateSelector 
                onBirthdateChange={setBirthdate} 
                onAgeChange={setAge} 
              />
              
              <PropertyOwnerGenderSelector onGenderChange={setGender} />
            </div>
            
            {formError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 font-['Poppins']">
                {formError}
              </div>
            )}
            
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`
                  ${isFormValid ? 'bg-[#FFDC30] hover:bg-[#e6c52b]' : 'bg-gray-200 cursor-not-allowed'} 
                  text-black font-bold py-3 px-8 rounded-lg transition-colors flex items-center font-['Poppins']
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : '¡Registra tu propiedad!'}
              </button>
              <button 
                type="button"
                onClick={onBack}
                className="border-2 border-[#FFDC30] text-black font-medium py-3 px-6 rounded-lg hover:bg-yellow-50 transition-colors font-['Poppins']"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PropertyOwnerRegistration; 