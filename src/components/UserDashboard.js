import React, { useState, useEffect, useCallback, useRef } from 'react';

// SVG Icon Components
const UserCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IdentificationIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm-2.25-9h19.5M10.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-3 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);
const HeartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);
const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
);

// Edificio SVG para 'Mis preferencias'
const BuildingIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25V21M3 21h18M3 21v-2.25A2.25 2.25 0 015.25 16.5h13.5A2.25 2.25 0 0121 18.75V21M9 21v-4.5a1.5 1.5 0 013 0V21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 7.5h.008v.008H9.75V7.5zm4.5 0h.008v.008h-.008V7.5zm-4.5 3h.008v.008H9.75v-.008zm4.5 0h.008v.008h-.008v-.008zm-4.5 3h.008v.008H9.75v-.008zm4.5 0h.008v.008h-.008v-.008z" />
  </svg>
);

const UserDashboard = ({ onBack }) => {
  const [userInfo, setUserInfo] = useState({
    nombreCompleto: '',
    edad: '',
    semestre: '',
    carrera: '',
    universidad: '',
    telefono: { codigoPais: '+52', numero: '' },
    email: '',
    presupuesto: '',
    fechaNacimiento: { dia: '', mes: '', año: '' },
    genero: '',
    nivelEducativo: '',
    tipoPreparatoria: '',
    esMexicano: false,
    estadoOrigen: '',
    fotoPerfil: null,
    fotoPerfilUrl: '',
    documentoIdentidad: null,
    documentoIdentidadUrl: '',
    preferencias: {
      zona: '',
      tipoVivienda: '',
      companeros: '',
      fumador: false,
      hobbies: [],
      noNegociables: [],
      otroNoNegociable: '',
      preferenciaRoomie: '',
      tieneMascota: 'no',
      tipoMascota: [],
      otroTipoMascota: ''
    },
    contactoEmergencia: {
      nombres: '',
      apellidos: '',
      telefono: { codigoPais: '+52', numero: '' },
      hablaEspanol: 'si',
      idioma: ''
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const fotoPerfilRef = useRef(null);
  const documentoIdentidadRef = useRef(null);

  const initialHobbies = [
    { name: 'Leer', icon: '📖' }, { name: 'Cantar', icon: '🎤' }, { name: 'Bailar', icon: '💃' },
    { name: 'Voluntariado', icon: '❤️' }, { name: 'Hacer deporte', icon: '⚽' }, { name: 'Música', icon: '🎵' },
    { name: 'Ver películas', icon: '🎬' }, { name: 'Socializar', icon: '🗣️' }
  ];

  const initialNoNegociables = [
    { name: 'No limpiar', icon: '🧹' }, { name: 'Extranjeros', icon: '🌍' }, { name: 'Desorden', icon: '🗑️' },
    { name: 'Fiestas después de las 8pm', icon: '🌙' }, { name: 'Fumar', icon: '🚭' }, { name: 'Alcohol', icon: '🍻' },
    { name: 'Drogas', icon: '💊' }, { name: 'No ser pet-friendly', icon: '🚫🐾' }, { name: 'Ser pet-friendly', icon: '🐾' },
    { name: 'Gatos', icon: '🐈' }, { name: 'Perros', icon: '🐕' }, { name: 'Roedores', icon: '🐁' }, { name: 'Agregar otra opción', icon: '➕' }
  ];
  
  const [noNegociablesList, setNoNegociablesList] = useState(initialNoNegociables);

  const codigosPais = [
    { codigo: '+52', sigla: 'MX' }, { codigo: '+1', sigla: 'US/CA' }, { codigo: '+33', sigla: 'FR' },
    { codigo: '+34', sigla: 'ES' }, { codigo: '+49', sigla: 'DE' }, { codigo: '+44', sigla: 'GB' },
  ];

  const estadosMexico = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
    'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
  ];

  // Ref for initial mount to prevent saving on load
  const isInitialMount = useRef(true);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('userDashboardData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Restore everything, but ensure file objects and their URLs are cleared
        setUserInfo(prev => ({ 
          ...prev, 
          ...parsedData, 
          fotoPerfil: null, 
          fotoPerfilUrl: '', // Clear preview
          documentoIdentidad: null,
          documentoIdentidadUrl: '' // Clear preview
        }));
        if (parsedData.preferencias && parsedData.preferencias.customNoNegociables) {
          const newNoNegociables = parsedData.preferencias.customNoNegociables.map(name => ({ name: name, icon: '✨' }));
          setNoNegociablesList([...initialNoNegociables, ...newNoNegociables]);
        }
      } catch (error) { console.error('Error al cargar datos guardados:', error); }
    }
  }, []); // Empty array ensures this runs only once on mount

  const saveToLocalStorage = useCallback(() => {
    if (isInitialMount.current) return;

    // Explicitly remove file objects and URL previews before saving to localStorage
    const { fotoPerfil, documentoIdentidad, fotoPerfilUrl, documentoIdentidadUrl, ...restOfUserInfo } = userInfo;
    
    const customNoNegociables = noNegociablesList
      .filter(item => !initialNoNegociables.some(initItem => initItem.name === item.name))
      .map(item => item.name);

    const dataToSave = {
      ...restOfUserInfo,
      preferencias: {
        ...restOfUserInfo.preferencias,
        customNoNegociables,
      },
    };

    try {
        localStorage.setItem('userDashboardData', JSON.stringify(dataToSave));
        setLastSaved(new Date());
    } catch (error) {
        console.error("Error saving to localStorage:", error);
        if (error.name === 'QuotaExceededError') {
            alert("No se pudo guardar la información. El almacenamiento del navegador está lleno. Intente con una imagen más pequeña.");
        }
    }
  }, [userInfo, noNegociablesList]);

  // Debounced autosave
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const handler = setTimeout(() => {
      saveToLocalStorage();
    }, 1500); // Save 1.5s after user stops typing
    return () => clearTimeout(handler);
  }, [userInfo, noNegociablesList, saveToLocalStorage]);
  
  useEffect(() => {
    if (userInfo.nivelEducativo === 'exatec') {
      setUserInfo(prev => ({ ...prev, semestre: 'egresado' }));
    }
  }, [userInfo.nivelEducativo]);

  useEffect(() => {
    if (userInfo.fechaNacimiento.dia && userInfo.fechaNacimiento.mes && userInfo.fechaNacimiento.año) {
      const fechaNacimiento = new Date(userInfo.fechaNacimiento.año, userInfo.fechaNacimiento.mes - 1, userInfo.fechaNacimiento.dia);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      if (hoy.getMonth() < fechaNacimiento.getMonth() || (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      setUserInfo(prev => ({ ...prev, edad: edad.toString() }));
    }
  }, [userInfo.fechaNacimiento]);
  
  const handleHobbyClick = (hobby) => {
    setUserInfo(prev => {
      const hobbies = prev.preferencias.hobbies || [];
      if (!hobbies.includes(hobby) && hobbies.length < 5) {
        const newUserInfo = { ...prev, preferencias: { ...prev.preferencias, hobbies: [...hobbies, hobby] } };
        setTimeout(saveToLocalStorage, 0);
        return newUserInfo;
      }
      return prev;
    });
  };

  const handleHobbyDoubleClick = (hobby) => {
    setUserInfo(prev => {
      const newUserInfo = { ...prev, preferencias: { ...prev.preferencias, hobbies: (prev.preferencias.hobbies || []).filter(h => h !== hobby) } };
      setTimeout(saveToLocalStorage, 0);
      return newUserInfo;
    });
  };
  
  const handleNoNegociableClick = (item) => {
    setUserInfo(prev => {
      const noNegociables = prev.preferencias.noNegociables || [];
      const isSelected = noNegociables.includes(item);
      const newNoNegociables = isSelected ? noNegociables.filter(i => i !== item) : [...noNegociables, item];
      const newUserInfo = { ...prev, preferencias: { ...prev.preferencias, noNegociables: newNoNegociables } };
      setTimeout(saveToLocalStorage, 0);
      return newUserInfo;
    });
  };

  const handleAddNoNegociable = () => {
    const newNoNegociable = userInfo.preferencias.otroNoNegociable.trim();
    if (newNoNegociable && !noNegociablesList.some(item => item.name === newNoNegociable)) {
        const newItem = { name: newNoNegociable, icon: '✨' }; 
        const addOptionIndex = noNegociablesList.findIndex(item => item.name === 'Agregar otra opción');
        const newNoNegociablesList = [
            ...noNegociablesList.slice(0, addOptionIndex),
            newItem,
            ...noNegociablesList.slice(addOptionIndex)
        ];
        setNoNegociablesList(newNoNegociablesList);

        setUserInfo(prev => ({
            ...prev,
            preferencias: {
                ...prev.preferencias,
                noNegociables: [...prev.preferencias.noNegociables, newNoNegociable],
                otroNoNegociable: ''
            }
        }));
    } else {
        setUserInfo(prev => ({ ...prev, preferencias: { ...prev.preferencias, otroNoNegociable: '' }}));
    }
  };
  
  const handleInputChange = async (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === 'file') {
      const file = files[0];
      if (!file) return;

      // Don't compress PDF files for identity document
      if (name === 'documentoIdentidad' && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUserInfo(prev => ({ 
            ...prev, 
            documentoIdentidad: file, 
            documentoIdentidadUrl: event.target.result 
          }));
        };
        reader.readAsDataURL(file);
        return;
      }

      // --- Canvas-based Image Compression ---
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const max_size = 1280; // Max width or height
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > max_size) {
            height *= max_size / width;
            width = max_size;
          }
        } else {
          if (height > max_size) {
            width *= max_size / height;
            height = max_size;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        
        // For profile picture, force JPG for better compression
        const mimeType = name === 'fotoPerfil' ? 'image/jpeg' : file.type;
        const quality = 0.8; // 80% quality
        const dataUrl = canvas.toDataURL(mimeType, quality);

        // Convert DataURL to Blob to store as a file-like object
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const compressedFile = new File([blob], file.name, {
              type: mimeType,
              lastModified: Date.now(),
            });

            if (name === 'fotoPerfil') {
              setUserInfo(prev => ({
                ...prev,
                fotoPerfil: compressedFile,
                fotoPerfilUrl: dataUrl,
              }));
            } else if (name === 'documentoIdentidad') {
               setUserInfo(prev => ({
                ...prev,
                documentoIdentidad: compressedFile,
                documentoIdentidadUrl: dataUrl,
              }));
            }
          });
      };
      return;
    }
  
    let finalValue = type === 'checkbox' ? checked : value;
  
    if (name === 'carrera') {
      finalValue = value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4);
    } else if (name.endsWith('.numero')) {
      finalValue = value.replace(/\D/g, '').slice(0, 10);
    }
  
    const nameParts = name.split('.');
    if (nameParts.length > 1) {
      setUserInfo(prev => {
        const newState = JSON.parse(JSON.stringify(prev));
        let current = newState;
        for (let i = 0; i < nameParts.length - 1; i++) {
          current = current[nameParts[i]];
        }
        current[nameParts[nameParts.length - 1]] = finalValue;
        return newState;
      });
    } else {
      setUserInfo(prev => ({ ...prev, [name]: finalValue }));
    }
  };

  const handlePetTypeChange = (e) => {
    const { value, checked } = e.target;
    setUserInfo(prev => {
      const tipoMascota = prev.preferencias.tipoMascota || [];
      const newTipoMascota = checked ? [...tipoMascota, value] : tipoMascota.filter(t => t !== value);
      const newUserInfo = { ...prev, preferencias: { ...prev.preferencias, tipoMascota: newTipoMascota } };
      setTimeout(saveToLocalStorage, 0);
      return newUserInfo;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The state `userInfo` already has the file objects if selected.
    // A page reload would have cleared them. No reconstruction needed.
    const submissionUserInfo = { ...userInfo };

    // --- Validation ---
    const requiredFields = {
        'nombreCompleto': 'Nombre Completo',
        'fechaNacimiento.dia': 'Día de Nacimiento',
        'fechaNacimiento.mes': 'Mes de Nacimiento',
        'fechaNacimiento.año': 'Año de Nacimiento',
        'genero': 'Género',
        'nivelEducativo': 'Nivel Educativo',
        'universidad': 'Universidad',
        'semestre': 'Semestre',
        'telefono.numero': 'Teléfono',
        'email': 'Email',
        'contactoEmergencia.nombres': 'Nombre(s) de Contacto de Emergencia',
        'contactoEmergencia.apellidos': 'Apellido(s) de Contacto de Emergencia',
        'contactoEmergencia.telefono.numero': 'Teléfono de Contacto de Emergencia',
        'fotoPerfil': 'Foto de Perfil',
        'documentoIdentidad': 'Documento de identidad',
    };
    
    const errors = new Set();

    for (const key in requiredFields) {
        const parts = key.split('.');
        let value = submissionUserInfo;
        try {
            parts.forEach(part => { value = value[part]; });
            if (!value) errors.add(requiredFields[key]);
        } catch (e) {
             errors.add(requiredFields[key]);
        }
    }

    if (submissionUserInfo.nivelEducativo === 'preparatoria' && !submissionUserInfo.tipoPreparatoria) {
        errors.add('Tipo de Preparatoria');
    }
    if ((submissionUserInfo.nivelEducativo === 'licenciatura' || submissionUserInfo.nivelEducativo === 'posgrado') && !submissionUserInfo.carrera) {
        errors.add('Carrera');
    }
    if (submissionUserInfo.esMexicano && !submissionUserInfo.estadoOrigen) {
        errors.add('Estado de Origen');
    }
    if ((submissionUserInfo.preferencias.noNegociables || []).length < 3) {
      errors.add('Al menos 3 "No-negociables"');
    }
    if (submissionUserInfo.preferencias.tieneMascota === 'si' && (submissionUserInfo.preferencias.tipoMascota || []).length === 0) {
        errors.add('Tipo de mascota');
    }
    if ((submissionUserInfo.preferencias.tipoMascota || []).includes('Otro') && !submissionUserInfo.preferencias.otroTipoMascota) {
        errors.add('Especificar otra mascota');
    }
    if (submissionUserInfo.contactoEmergencia.hablaEspanol === 'no' && !submissionUserInfo.contactoEmergencia.idioma) {
        errors.add('Idioma del contacto de emergencia');
    }


    if (errors.size > 0) {
        alert(`Por favor, completa los siguientes campos obligatorios:\n\n- ${[...errors].join('\n- ')}`);
        return;
    }

    console.log("Archivos listos para el envío:", {
        fotoPerfil: submissionUserInfo.fotoPerfil,
        documentoIdentidad: submissionUserInfo.documentoIdentidad,
    });

    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // We save the original state (userInfo), not the submission-specific one with reconstructed files
      saveToLocalStorage(); 
      alert('Información guardada y archivos listos para ser enviados.');
    } catch (error) {
      alert('Error al guardar la información. Por favor, intenta de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const generateDays = () => Array.from({ length: 31 }, (_, i) => i + 1);
  const generateMonths = () => [
      { value: 1, label: 'Enero' }, { value: 2, label: 'Febrero' }, { value: 3, label: 'Marzo' }, { value: 4, label: 'Abril' }, 
      { value: 5, label: 'Mayo' }, { value: 6, label: 'Junio' }, { value: 7, label: 'Julio' }, { value: 8, label: 'Agosto' }, 
  ];
  const generateYears = () => {
    const years = [];
    const endYear = new Date().getFullYear() - 14;
    for (let i = endYear; i >= 1950; i--) { years.push(i); }
    return years;
  };
  
  const handleClearFile = (fieldName) => {
    setUserInfo(prev => ({
      ...prev,
      [fieldName]: null,
      [`${fieldName}Url`]: '',
    }));
    if (fieldName === 'fotoPerfil' && fotoPerfilRef.current) {
      fotoPerfilRef.current.value = '';
    }
    if (fieldName === 'documentoIdentidad' && documentoIdentidadRef.current) {
      documentoIdentidadRef.current.value = '';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-[#ffd662] hover:text-yellow-600 font-semibold mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Volver
          </button>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold text-[#0a2a5c] mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Completa tu información personal para encontrar el roomie y espacio perfecto.</p>
            {lastSaved && <div className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full mt-2">Último guardado: {lastSaved.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-12">
            <div>
              <h2 className="text-xl font-semibold text-[#0a2a5c] mb-4 flex items-center border-b pb-2"><UserCircleIcon className="w-6 h-6 mr-2 text-[#ffd662]" /> Foto de Perfil</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">⚠️</div>
                  <div className="ml-3"><p className="text-sm text-yellow-700 font-medium"><strong>Importante:</strong> Favor de cargar una imagen real tuya; de lo contrario, se eliminará tu perfil.</p></div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {userInfo.fotoPerfilUrl ? <img src={userInfo.fotoPerfilUrl} alt="Foto de perfil" className="h-20 w-20 rounded-full object-cover border-2 border-[#ffd662]" /> : <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300"><UserCircleIcon className="h-10 w-10 text-gray-400" /></div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <input ref={fotoPerfilRef} type="file" name="fotoPerfil" accept="image/*" onChange={handleInputChange} className="flex-grow w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#ffd662] file:text-black hover:file:bg-yellow-400" />
                    {userInfo.fotoPerfilUrl && (
                      <button type="button" onClick={() => handleClearFile('fotoPerfil')} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700" title="Quitar archivo">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0a2a5c] mb-4 flex items-center border-b pb-2"><IdentificationIcon className="w-6 h-6 mr-2 text-[#ffd662]" /> Documento de identidad</h2>
              <p className="text-sm text-gray-600 mb-3">Sube tu INE, pasaporte o licencia. Si eres menor de edad, sube tu acta de nacimiento.</p>
              <div className="flex items-center space-x-4">
                {userInfo.documentoIdentidadUrl && <div className="flex-shrink-0"><img src={userInfo.documentoIdentidadUrl} alt="Documento de identidad" className="h-16 w-24 object-cover border border-gray-300 rounded"/></div>}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <input ref={documentoIdentidadRef} type="file" name="documentoIdentidad" accept="image/*,.pdf" onChange={handleInputChange} className="flex-grow w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#ffd662] file:text-black hover:file:bg-yellow-400" />
                    {userInfo.documentoIdentidadUrl && (
                      <button type="button" onClick={() => handleClearFile('documentoIdentidad')} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700" title="Quitar archivo">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">PNG, JPG, PDF hasta 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0a2a5c] mb-4 flex items-center border-b pb-2"><UserCircleIcon className="w-6 h-6 mr-2 text-[#ffd662]" />Información personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label><input type="text" name="nombreCompleto" value={userInfo.nombreCompleto} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento *</label><div className="grid grid-cols-3 gap-2"><select name="fechaNacimiento.dia" value={userInfo.fechaNacimiento.dia} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent"><option value="">Día</option>{generateDays().map(day => <option key={day} value={day}>{day}</option>)}</select><select name="fechaNacimiento.mes" value={userInfo.fechaNacimiento.mes} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent"><option value="">Mes</option>{generateMonths().map(month => <option key={month.value} value={month.value}>{month.label}</option>)}</select><select name="fechaNacimiento.año" value={userInfo.fechaNacimiento.año} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent"><option value="">Año</option>{generateYears().map(year => <option key={year} value={year}>{year}</option>)}</select></div></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Edad (automática)</label><input type="text" value={userInfo.edad ? `${userInfo.edad} años` : ''} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600" readOnly /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Género *</label><select name="genero" value={userInfo.genero} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent"><option value="">Selecciona tu género</option><option value="masculino">Masculino</option><option value="femenino">Femenino</option><option value="otro">Otro</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Nivel Educativo Actual *</label><div className="space-y-2">{['preparatoria', 'licenciatura', 'posgrado', 'exatec'].map((nivel) => <label key={nivel} className="flex items-center"><input type="radio" name="nivelEducativo" value={nivel} checked={userInfo.nivelEducativo === nivel} onChange={handleInputChange} className="h-4 w-4 text-[#ffd662] focus:ring-[#ffd662] border-gray-300" /><span className="ml-2 text-sm text-gray-700 capitalize">{nivel === 'exatec' ? 'Exatec' : nivel}</span></label>)}</div></div>
                {userInfo.nivelEducativo === 'preparatoria' && <div><label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Preparatoria *</label><select name="tipoPreparatoria" value={userInfo.tipoPreparatoria} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent"><option value="">Selecciona el tipo</option><option value="bicultural">Bicultural</option><option value="multicultural">Multicultural</option><option value="internacional">Internacional</option></select></div>}
                {(userInfo.nivelEducativo === 'licenciatura' || userInfo.nivelEducativo === 'posgrado') && <div><label className="block text-sm font-medium text-gray-700 mb-2">Carrera (4 letras máximo) *</label><input type="text" name="carrera" value={userInfo.carrera} onChange={handleInputChange} placeholder="EJ: INGE" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent uppercase" maxLength={4} /><p className="mt-1 text-xs text-gray-500">Máximo 4 letras, sin números</p></div>}
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Universidad *</label><input type="text" name="universidad" value={userInfo.universidad} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Semestre *</label><select name="semestre" value={userInfo.semestre} onChange={handleInputChange} className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent ${userInfo.nivelEducativo === 'exatec' ? 'bg-gray-100' : ''}`} disabled={userInfo.nivelEducativo === 'exatec'}><option value="">Selecciona tu semestre</option>{Array.from({ length: 10 }, (_, i) => i + 1).map(s => <option key={s} value={s}>{s}º Semestre</option>)}<option value="egresado">Egresado</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label><div className="flex"><select name="telefono.codigoPais" value={userInfo.telefono.codigoPais} onChange={handleInputChange} className="w-28 px-2 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent bg-gray-50">{codigosPais.map(({ codigo, sigla }) => <option key={codigo} value={codigo}>{sigla} {codigo}</option>)}</select><input type="tel" name="telefono.numero" value={userInfo.telefono.numero} onChange={handleInputChange} placeholder="1234567890" className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" maxLength={10} /></div><p className="mt-1 text-xs text-gray-500">Máximo 10 dígitos</p></div>
                <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-x-4 items-end">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" />
                      </div>
                      <div className="flex items-center mb-0.5 h-full">
                        <input type="checkbox" name="esMexicano" checked={userInfo.esMexicano} onChange={handleInputChange} className="h-4 w-4 text-[#ffd662] focus:ring-[#ffd662] border-gray-300 rounded ml-2" />
                        <label className="ml-2 block text-sm text-gray-700 whitespace-nowrap">¿Eres mexicano?</label>
                      </div>
                    </div>
                </div>
                {userInfo.esMexicano && <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Estado de Origen *</label><select name="estadoOrigen" value={userInfo.estadoOrigen} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent"><option value="">Selecciona tu estado</option>{estadosMexico.map(estado => <option key={estado} value={estado}>{estado}</option>)}</select></div>}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0a2a5c] mb-4 flex items-center border-b pb-2"><BuildingIcon className="w-6 h-6 mr-2 text-[#ffd662]" />Mis preferencias</h2>
              <div className="space-y-6 mt-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Mis hobbies (máximo 5)</label>
                    <span className="text-xs text-gray-500">Un clic para seleccionar, doble clic para deseleccionar.</span>
                  </div>
                  <div className="flex flex-wrap gap-2">{initialHobbies.map(({name, icon}) => <button type="button" key={name} onClick={() => handleHobbyClick(name)} onDoubleClick={() => handleHobbyDoubleClick(name)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${(userInfo.preferencias.hobbies || []).includes(name) ? 'bg-yellow-200 text-yellow-800 ring-2 ring-yellow-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><span className="text-lg">{icon}</span>{name}</button>)}</div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">No-negociables (mínimo 3)</label>
                    <span className="text-xs text-gray-500">Un clic para seleccionar/deseleccionar.</span>
                  </div>
                  <div className="flex flex-wrap gap-2">{noNegociablesList.map(({name, icon}) => <button type="button" key={name} onClick={() => handleNoNegociableClick(name)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${(userInfo.preferencias.noNegociables || []).includes(name) ? 'bg-yellow-200 text-yellow-800 ring-2 ring-yellow-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><span className="text-lg">{icon}</span>{name}</button>)}</div>
                  {(userInfo.preferencias.noNegociables || []).includes('Agregar otra opción') && <div className="mt-3 flex items-center gap-2"><input type="text" name="preferencias.otroNoNegociable" value={userInfo.preferencias.otroNoNegociable} onChange={handleInputChange} className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" maxLength={100} placeholder="Escribe tu 'No-negociable'" /><button type="button" onClick={handleAddNoNegociable} className="bg-[#ffd662] text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-300">Enviar</button></div>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Prefiero roomies</label><select name="preferencias.preferenciaRoomie" value={userInfo.preferencias.preferenciaRoomie} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent"><option value="">Cualquiera</option><option value="mujer">Mujer</option><option value="hombre">Hombre</option><option value="mixto">Mixto</option></select></div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tengo mascota</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center"><input type="radio" name="preferencias.tieneMascota" value="si" checked={userInfo.preferencias.tieneMascota === 'si'} onChange={handleInputChange} className="h-4 w-4 text-[#ffd662] focus:ring-[#ffd662] border-gray-300" /><span className="ml-2 text-sm">Sí</span></label>
                      <label className="flex items-center"><input type="radio" name="preferencias.tieneMascota" value="no" checked={userInfo.preferencias.tieneMascota === 'no'} onChange={handleInputChange} className="h-4 w-4 text-[#ffd662] focus:ring-[#ffd662] border-gray-300" /><span className="ml-2 text-sm">No</span></label>
                    </div>
                    {userInfo.preferencias.tieneMascota === 'si' && <div className="mt-4"><label className="block text-sm font-medium text-gray-700 my-2">Tipo de mascota</label><div className="flex flex-wrap gap-4">{['Perro', 'Gato', 'Roedor', 'Otro'].map(tipo => <label key={tipo} className="flex items-center"><input type="checkbox" value={tipo} checked={(userInfo.preferencias.tipoMascota || []).includes(tipo)} onChange={handlePetTypeChange} className="h-4 w-4 text-[#ffd662] focus:ring-[#ffd662] border-gray-300 rounded" /><span className="ml-2 text-sm">{tipo}</span></label>)}</div>{(userInfo.preferencias.tipoMascota || []).includes('Otro') && <div className="mt-3"><label className="block text-sm font-medium text-gray-700 mb-2">Especifica tu mascota</label><input type="text" name="preferencias.otroTipoMascota" value={userInfo.preferencias.otroTipoMascota} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" maxLength={50} /></div>}</div>}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input type="checkbox" name="preferencias.fumador" checked={userInfo.preferencias.fumador} onChange={handleInputChange} className="h-4 w-4 text-[#ffd662] focus:ring-[#ffd662] border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">¿Eres fumador?</label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0a2a5c] mb-4 flex items-center border-b pb-2"><PhoneIcon className="w-6 h-6 mr-2 text-[#ffd662]" />Contacto de Emergencia</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4"><div className="flex"><div className="flex-shrink-0">⚠️</div><div className="ml-3"><p className="text-sm text-yellow-700 font-medium"><strong>Importante:</strong> Favor de ingresar el nombre completo de la persona tal cual como aparece en su identificación oficial.</p></div></div></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Nombre(s) *</label><input type="text" name="contactoEmergencia.nombres" value={userInfo.contactoEmergencia.nombres} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Apellido(s) *</label><input type="text" name="contactoEmergencia.apellidos" value={userInfo.contactoEmergencia.apellidos} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label><div className="flex"><select name="contactoEmergencia.telefono.codigoPais" value={userInfo.contactoEmergencia.telefono.codigoPais} onChange={handleInputChange} className="w-28 px-2 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent bg-gray-50">{codigosPais.map(({ codigo, sigla }) => <option key={codigo} value={codigo}>{sigla} {codigo}</option>)}</select><input type="tel" name="contactoEmergencia.telefono.numero" value={userInfo.contactoEmergencia.telefono.numero} onChange={handleInputChange} placeholder="1234567890" className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" maxLength={10} /></div></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">¿Habla español?</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center"><input type="radio" name="contactoEmergencia.hablaEspanol" value="si" checked={userInfo.contactoEmergencia.hablaEspanol === 'si'} onChange={handleInputChange} className="h-4 w-4 text-[#ffd662] focus:ring-[#ffd662] border-gray-300" /><span className="ml-2 text-sm">Sí</span></label>
                    <label className="flex items-center"><input type="radio" name="contactoEmergencia.hablaEspanol" value="no" checked={userInfo.contactoEmergencia.hablaEspanol === 'no'} onChange={handleInputChange} className="h-4 w-4 text-[#ffd662] focus:ring-[#ffd662] border-gray-300" /><span className="ml-2 text-sm">No</span></label>
                  </div>
                </div>
                {userInfo.contactoEmergencia.hablaEspanol === 'no' && <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Idioma del contacto</label><input type="text" name="contactoEmergencia.idioma" value={userInfo.contactoEmergencia.idioma} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd662] focus:border-transparent" placeholder="Ej: Inglés" /></div>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button type="submit" disabled={isSaving} className="flex-1 bg-[#ffd662] text-black font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                {isSaving ? <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Guardando...</> : <><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Guardar Información</>}
              </button>
              <button type="button" onClick={onBack} className="flex-1 border-2 border-[#ffd662] text-black font-bold py-3 px-6 rounded-md hover:bg-yellow-100 transition duration-300">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 