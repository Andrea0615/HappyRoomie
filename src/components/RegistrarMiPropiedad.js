import React, { useId, useMemo, useState } from "react";

const Icon = ({ children }) => (
  <span className="w-10 h-10 rounded-full bg-yellow-50 border border-[#FFDC30] flex items-center justify-center">
    {children}
  </span>
);

const ChoiceGrid = ({ options, value, onChange, cols = 2 }) => {
  const gridCols = cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";
  return (
  <div className={`grid grid-cols-1 ${gridCols} gap-3`}>
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={`w-full text-left p-4 rounded-xl border transition-all ${
          value === opt.value
            ? "border-[#FFDC30] bg-yellow-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon>{opt.icon}</Icon>
          <div>
            <div className="font-semibold text-[#0a2a5c]">{opt.label}</div>
            {opt.hint ? <div className="text-xs text-gray-500 mt-0.5">{opt.hint}</div> : null}
          </div>
        </div>
      </button>
    ))}
  </div>
  );
};

const YesNo = ({ value, onChange, yesLabel = "Sí", noLabel = "No" }) => (
  <div className="flex gap-3 justify-center">
    <button
      type="button"
      onClick={() => onChange(true)}
      className={`px-6 py-3 rounded-xl border font-medium transition ${
        value === true ? "border-[#FFDC30] bg-yellow-50" : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {yesLabel}
    </button>
    <button
      type="button"
      onClick={() => onChange(false)}
      className={`px-6 py-3 rounded-xl border font-medium transition ${
        value === false ? "border-[#FFDC30] bg-yellow-50" : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {noLabel}
    </button>
  </div>
);

const CheckboxList = ({ options, values, onToggle, getIcon }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {options.map((opt) => {
      const checked = values.includes(opt);
      const icon = getIcon ? getIcon(opt) : null;
      return (
        <label
          key={opt}
          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
            checked ? "border-[#FFDC30] bg-yellow-50" : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggle(opt)}
            className="accent-[#FFDC30] w-4 h-4"
          />
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-sm text-[#0a2a5c]">{opt}</span>
        </label>
      );
    })}
  </div>
);

// Componente reutilizable para subir fotos: tarjeta con borde punteado, icono y texto
const PhotoUpload = ({ label, description, multiple, value, onChange, maxPreview = 6, maxFiles }) => {
  const inputId = useId();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const files = multiple ? (Array.isArray(value) ? value : value ? [value] : []) : (value ? [value] : []);
  const hasFiles = files.length > 0;
  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files || []);
    e.target.value = "";
    if (multiple) {
      if (maxFiles != null) {
        const combined = [...files, ...newFiles].slice(0, maxFiles);
        onChange(combined);
      } else {
        onChange(newFiles);
      }
    } else {
      onChange(newFiles[0] || null);
    }
  };
  const removeAt = (idx, e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = files.filter((_, i) => i !== idx);
    onChange(multiple ? next : (next[0] || null));
  };
  const handleDragStart = (e, idx) => {
    setDraggedIndex(idx);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", idx);
    e.dataTransfer.setData("application/json", JSON.stringify({ index: idx }));
  };
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(idx);
  };
  const handleDragLeave = () => setDragOverIndex(null);
  const handleDrop = (e, dropIdx) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(null);
    if (draggedIndex == null || draggedIndex === dropIdx) {
      setDraggedIndex(null);
      return;
    }
    const reordered = [...files];
    const [removed] = reordered.splice(draggedIndex, 1);
    reordered.splice(dropIdx, 0, removed);
    onChange(reordered);
    setDraggedIndex(null);
  };
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-[#0a2a5c]">{label}</label>}
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {maxFiles != null && multiple && (
        <p className="text-xs text-gray-500">Hasta {maxFiles} {maxFiles === 1 ? "foto" : "fotos"}</p>
      )}
      <label
        htmlFor={inputId}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors cursor-pointer min-h-[140px] ${
          hasFiles ? "border-[#0a2a5c]/30 bg-[#0a2a5c]/5" : "border-gray-300 bg-gray-50/50 hover:border-[#0a2a5c]/40 hover:bg-[#0a2a5c]/5"
        }`}
      >
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
        />
        {!hasFiles ? (
          <>
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0a2a5c]/10 text-[#0a2a5c] mb-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h3l2-2h6a2 2 0 012 2z" />
              </svg>
            </span>
            <span className="text-sm font-medium text-[#0a2a5c]">Arrastra fotos aquí o haz clic</span>
            <span className="text-xs text-gray-500 mt-0.5">JPG, PNG</span>
          </>
        ) : (
          <div className="w-full p-3">
            <div className="flex gap-3 flex-wrap items-start">
              <div className={`grid gap-2 flex-1 min-w-0 ${files.length === 1 ? "grid-cols-1" : "grid-cols-3"}`}>
                {files.slice(0, maxPreview).map((f, idx) => (
                  <div
                    key={idx}
                    draggable={multiple && files.length > 1}
                    onDragStart={(e) => multiple && files.length > 1 && handleDragStart(e, idx)}
                    onDragOver={(e) => multiple && files.length > 1 && handleDragOver(e, idx)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => multiple && files.length > 1 && handleDrop(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`relative rounded-lg overflow-hidden bg-gray-100 aspect-video cursor-grab active:cursor-grabbing ${
                      draggedIndex === idx ? "opacity-50" : ""
                    } ${dragOverIndex === idx ? "ring-2 ring-[#0a2a5c] ring-offset-2" : ""}`}
                  >
                    <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover pointer-events-none" draggable={false} />
                    <button
                      type="button"
                      onClick={(e) => removeAt(idx, e)}
                      className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center text-sm font-bold transition-colors"
                      aria-label="Eliminar foto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {multiple && (maxFiles == null || files.length < maxFiles) && (
                <span className="inline-flex items-center justify-center w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 text-3xl text-gray-400 hover:border-[#0a2a5c] hover:text-[#0a2a5c] hover:bg-[#0a2a5c]/5 transition-colors flex-shrink-0">
                  +
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {files.length} {files.length === 1 ? "foto" : "fotos"} · Arrastra para ordenar · Haz clic para agregar
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

const ProgressBar = ({ current, total }) => {
  const pct = total <= 1 ? 100 : Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>Progreso</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-2 bg-[#FFDC30]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default function RegistrarMiPropiedad({ onBack, onDone }) {
  const SECURITY_CONDOMINIO = "Condominio privado con seguridad 24/7";
  const SECURITY_EDIFICIO = "Edificio con seguridad 24/7";
  const SECURITY_NA = "No aplica";

  // Icono: guardia en caseta (seguridad 24/7)
  const IconGuardiaCaseta = () => <span className="text-xl" aria-hidden>👮</span>;
  // Icono: no aplica
  const IconNoAplica = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
    </svg>
  );
  // Tipo de baño: Propio (verde) / Compartido (rojo) — estilo semáforo
  const IconBanoPropio = () => (
    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-100 text-emerald-600">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </span>
  );
  const IconBanoCompartido = () => (
    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100 text-red-600">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );

  const FURNITURE_OPTIONS = ["Escritorio", "Cama", "Silla", "Espejo de cuerpo completo", "Armario", "Lámpara de escritorio"];
  const BED_TYPE_OPTIONS = ["Individual", "Matrimonial", "Queen", "King", "Litera"];
  const AMENITIES = [
    "Clubhouse",
    "Alberca",
    "Gym",
    "Jardín",
    "Asadores",
    "Pista para correr",
    "Actividades deportivas",
    "Lavadora",
    "Secadora",
    "Hamaca",
    "Roof-top",
    "Estacionamiento techado",
  ];
  const INCLUDED_SERVICES = ["Luz", "Agua", "Gas", "Internet", "Limpieza", "Mantenimiento", "Agua potable", "Todos los servicios"];
  const CAMPUS_OPTIONS = ["Guadalajara", "Querétaro", "Santa Fé"];
  const ESTADOS_MEXICO = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
    "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero",
    "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
    "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
    "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ];
  const ESPACIOS_COMUNES = ["Sala", "Comedor", "Cocina", "Terraza", "Patio", "Área de lavado", "Garage", "Bodega"];
  const AMENIDADES_CASA = ["Secadora", "Lavadora", "Estacionamiento techado", "Hamaca", "Alberca", "Asador", "Jardín", "Roof-Top"];
  const AMENIDADES_CASA_CLUB = ["Gym", "Pista para correr", "Actividades deportivas", "Alberca", "Asadores", "Áreas verdes"];
  const MASCOTAS_OPTIONS = ["Perros", "Gatos", "Reptiles", "Roedores"];

  // Icon functions for checkboxes
  const getEspaciosComunesIcon = (opt) => {
    const icons = {
      "Sala": "🛋️",
      "Comedor": "🍽️",
      "Cocina": "🍳",
      "Terraza": "☀️",
      "Patio": "🌳",
      "Área de lavado": "🧺",
      "Garage": "🚗",
      "Bodega": "📦"
    };
    return icons[opt] || "";
  };

  const getAmenidadesCasaIcon = (opt) => {
    const icons = {
      "Secadora": "🌬️",
      "Lavadora": "🌀",
      "Estacionamiento techado": "🅿️",
      "Hamaca": "🛏️",
      "Alberca": "🏊",
      "Asador": "🔥",
      "Jardín": "🌺",
      "Roof-Top": "🏙️"
    };
    return icons[opt] || "";
  };

  const getAmenidadesCasaClubIcon = (opt) => {
    const icons = {
      "Gym": "💪",
      "Pista para correr": "🏃",
      "Actividades deportivas": "⚽",
      "Alberca": "🏊",
      "Asadores": "🔥",
      "Áreas verdes": "🌿"
    };
    return icons[opt] || "";
  };

  const getServiciosIcon = (opt) => {
    const icons = {
      "Luz": "💡",
      "Agua": "💧",
      "Gas": "🔥",
      "Internet": "🌐",
      "Limpieza": "🧹",
      "Mantenimiento": "🔧",
      "Agua potable": "🥤"
    };
    return icons[opt] || "";
  };

  const IconMesa = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="4" rx="0.5" />
      <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
    </svg>
  );
  const getFurnitureIcon = (opt) => {
    if (opt === "Escritorio") return <IconMesa />;
    const icons = {
      "Cama": "🛏️",
      "Silla": "🪑",
      "Espejo de cuerpo completo": "🪞",
      "Armario": "🚪",
      "Lámpara de escritorio": "💡"
    };
    return icons[opt] || "";
  };

  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    propertyType: "",
    dentroDe: "", // "Casa" o "Departamento" para Cuarto
    numRoomsToRent: 0, // Number of rooms to rent individually for Cuarto
    registerRoomDetails: null, // Whether to register room details for Cuarto
    rooms: [], // Array of room details for Cuarto
    currentRoomIndex: 0, // Current room being registered for Cuarto
    campus: "",
    numRooms: 0, // Number of rooms for Casa/Departamento
    registerBedroomDetails: null, // Whether to register bedroom details
    bedrooms: [], // Array of bedroom details
    currentBedroomIndex: 0, // Current bedroom being registered
    title: "",
    addressGeneral: "",
    calle: "",
    numero: "",
    colonia: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    description: "",
    price: 5000,
    furnished: null,
    furnishedType: null, // "Totalmente" o "Parcialmente"
    servicesIncluded: null,
    includedServices: [],
    petFriendly: null,
    mascotasPermitidas: [],
    bathroomTypeForRoom: "",
    bathroomsCount: 1,
    banosCompletos: 1,
    banosMedios: 0,
    parkingSpaces: 0,
    genderCompatible: "",
    amenities: [],
    amenidadesCasa: [],
    tieneCasaClub: false,
    amenidadesCasaClub: [],
    amenidadesCasaOtro: "",
    amenidadesCasaClubOtro: "",
    espaciosComunes: [],
    espaciosComunesOtro: "",
    securityType: "",
    photos: [], // General house photos
    fotosHabitaciones: [], // Room and bathroom photos
    fotosAreasComunes: [], // Common areas photos (building/condominium)
    fotoCasaClub: null, // Casa Club photo
    estadoSearch: "",
  });

  const steps = useMemo(() => {
    const base = [];

    base.push({
      key: "propertyType",
      title: "¿Qué tipo de propiedad es?",
      canContinue: !!data.propertyType,
      render: () => (
        <ChoiceGrid
          value={data.propertyType}
          onChange={(v) => setData((d) => ({ ...d, propertyType: v, dentroDe: (v === "Cuarto" || v === "Loft") ? data.dentroDe : "", securityType: "" }))}
          cols={2}
          options={[
            {
              value: "Casa",
              label: "Casa",
              hint: "Completa, la rentaré toda.",
              icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z" />
                </svg>
              ),
            },
            {
              value: "Departamento",
              label: "Departamento",
              hint: "Completo, lo rentaré todo.",
              icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 21V3h16v18M8 7h2m-2 4h2m4-4h2m-2 4h2M9 21v-5h6v5" />
                </svg>
              ),
            },
            {
              value: "Cuarto",
              label: "Cuarto",
              hint: "Rentaré por habitación de casa/ depa.",
              icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 10h16v10H4V10zm2-6h12a2 2 0 0 1 2 2v4H4V6a2 2 0 0 1 2-2z" />
                </svg>
              ),
            },
            {
              value: "Loft",
              label: "Loft",
              hint: "Todo en el mismo espacio.",
              icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ),
            },
          ]}
        />
      ),
    });

    // Add "Dentro de" step for Cuarto/Loft (right after property type)
    if (data.propertyType === "Cuarto" || data.propertyType === "Loft") {
      base.push({
        key: "dentroDe",
        title: "¿Dentro de?",
        canContinue: !!data.dentroDe,
        render: () => (
          <ChoiceGrid
            value={data.dentroDe}
            onChange={(v) => setData((d) => ({ ...d, dentroDe: v, securityType: "" }))}
            cols={2}
            options={[
              {
                value: "Casa",
                label: "Casa",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z" />
                  </svg>
                ),
              },
              {
                value: "Departamento",
                label: "Departamento",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 21V3h16v18M8 7h2m-2 4h2m4-4h2m-2 4h2M9 21v-5h6v5" />
                  </svg>
                ),
              },
            ]}
          />
        ),
      });
    }


    base.push({
      key: "campus",
      title: "¿En qué campus?",
      canContinue: !!data.campus,
      render: () => (
        <ChoiceGrid
          value={data.campus}
          onChange={(v) => setData((d) => ({ ...d, campus: v }))}
          cols={3}
          options={CAMPUS_OPTIONS.map((campus) => ({
            value: campus,
            label: campus,
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
          }))}
        />
      ),
    });

    base.push({
      key: "title",
      title: "Ponle un título",
      canContinue: data.title.trim().length >= 6 && data.addressGeneral.trim().length >= 3,
      render: () => (
        <div className="space-y-4">
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
            placeholder='Ej. "Cuarto amueblado cerca del Tec"'
            value={data.title}
            onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
          />
          <div className="rounded-xl border-2 border-[#0a2a5c]/10 bg-[#0a2a5c]/3 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0a2a5c]/70 flex items-center justify-center text-white" aria-hidden>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-[#0a2a5c] uppercase tracking-wide">Zona general</p>
                <p className="text-xs text-[#0a2a5c]/80">Nombre del condominio, o la zona</p>
              </div>
            </div>
            <input
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#FFDC30] focus:border-[#FFDC30]"
              placeholder="Ej. Porta Real, El Real, Solé, etc."
              value={data.addressGeneral}
              onChange={(e) => setData((d) => ({ ...d, addressGeneral: e.target.value }))}
            />
          </div>
        </div>
      ),
    });

    base.push({
      key: "address",
      title: "Dirección",
      canContinue: data.calle.trim().length >= 3 && data.numero.trim().length >= 1 && data.colonia.trim().length >= 3 && data.ciudad.trim().length >= 3 && data.estado.trim().length >= 3 && data.codigoPostal.trim().length >= 5,
      render: () => (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 italic">(La dirección exacta no se mostrará hasta que lo autorice)</p>
          
          <div>
            <label className="block text-sm font-medium text-[#0a2a5c] mb-1">Calle</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
              placeholder="Nombre de la calle"
              value={data.calle}
              onChange={(e) => setData((d) => ({ ...d, calle: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0a2a5c] mb-1">Número</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
              placeholder="Número de casa/departamento"
              value={data.numero}
              onChange={(e) => setData((d) => ({ ...d, numero: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0a2a5c] mb-1">Colonia</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
              placeholder="Colonia"
              value={data.colonia}
              onChange={(e) => setData((d) => ({ ...d, colonia: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#0a2a5c] mb-1">Ciudad</label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
                placeholder="Ciudad"
                value={data.ciudad}
                onChange={(e) => setData((d) => ({ ...d, ciudad: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0a2a5c] mb-1">Estado</label>
              <div className="relative">
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FFDC30] appearance-none bg-white cursor-pointer"
                  value={data.estado}
                  onChange={(e) => setData((d) => ({ ...d, estado: e.target.value, estadoSearch: "" }))}
                >
                  <option value="">Selecciona estado</option>
                  {ESTADOS_MEXICO.map((est) => (
                    <option key={est} value={est}>{est}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0a2a5c] mb-1">Código Postal</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
              placeholder="Código postal"
              type="text"
              maxLength={5}
              value={data.codigoPostal}
              onChange={(e) => setData((d) => ({ ...d, codigoPostal: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
            />
          </div>
        </div>
      ),
    });

    // Skip general price step for Cuarto (they set individual room prices)
    if (data.propertyType !== "Cuarto") {
      base.push({
        key: "price",
        title: "Precio mensual",
        canContinue: Number.isFinite(data.price) && data.price >= 1000,
      render: () => {
        // Función para convertir valor del slider a precio real (escala lineal hasta 30k)
        const sliderToPrice = (sliderValue) => {
          // 0-100 del slider = 1000-30000
          const price = 1000 + (sliderValue / 100) * 29000;
          return Math.round(price / 500) * 500; // Redondear a múltiplos de 500
        };

        // Función para convertir precio real a valor del slider
        const priceToSlider = (price) => {
          if (price <= 30000) {
            return ((price - 1000) / 29000) * 100;
          } else {
            // Si el precio es mayor a 30k, el slider se mantiene en 100 (máximo visual)
            // pero el usuario puede escribir valores mayores en el input
            return 100;
          }
        };

        // Función para formatear número con comas
        const formatNumber = (num) => {
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        // Función para parsear número sin comas
        const parseNumber = (str) => {
          return parseInt(str.replace(/,/g, ''), 10) || 0;
        };

        const currentSliderValue = priceToSlider(data.price);

        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="relative border-2 border-gray-300 rounded-xl px-3 py-3 bg-white" style={{ width: '200px' }}>
                  <span className="absolute left-3 text-lg font-bold text-[#0a2a5c]">$</span>
                  <input
                    type="text"
                    value={data.price > 0 ? formatNumber(data.price) : ''}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, '');
                      const numValue = parseInt(rawValue, 10) || 0;
                      setData((d) => ({ ...d, price: numValue }));
                    }}
                    onBlur={() => {
                      if (data.price < 1000) {
                        setData((d) => ({ ...d, price: 5000 }));
                      }
                    }}
                    className="w-full text-center text-lg font-bold text-[#0a2a5c] bg-transparent border-0 outline-none focus:outline-none pl-6"
                    placeholder="5,000"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Puedes escribir un precio mayor a $30,000 directamente en el cuadro</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>$1,000</span>
                <span>$5,000</span>
                <span>$10,000</span>
                <span>$15,000</span>
                <span>$20,000</span>
                <span>$25,000</span>
                <span>$30,000</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.min(100, currentSliderValue)}
                  onChange={(e) => {
                    const newSliderValue = parseInt(e.target.value, 10);
                    const newPrice = sliderToPrice(newSliderValue);
                    setData((d) => ({ ...d, price: newPrice }));
                  }}
                  className="w-full accent-[#FFDC30]"
                />
              </div>
            </div>
          </div>
        );
      },
      });
    }


    // Add "How many rooms to rent individually" step for Cuarto (after price step)
    if (data.propertyType === "Cuarto") {
      base.push({
        key: "numRoomsToRent",
        title: "¿Cuántas habitaciones deseas registrar?",
        subtitle: "(Ej. tu casa tiene 3, pero aquí registrarás 2)",
        canContinue: data.numRoomsToRent >= 1 && data.numRoomsToRent <= 5 ? true : (data.numRoomsToRent >= 6),
        render: () => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["1", "2", "3", "4", "5"].map((v) => {
                const selected = data.numRoomsToRent === parseInt(v, 10);
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      const count = parseInt(v, 10);
                      const rooms = Array.from({ length: count }, () => ({
                        hasFurniture: null,
                        furniture: [],
                        furnitureOtroInput: "",
                        bedType: "",
                        roomPhoto: [],
                        bathroomPhoto: [],
                        bathroomType: "",
                        bedroomType: "",
                        sharedWithCount: 2,
                        price: 5000,
                      }));
                      setData((d) => ({ ...d, numRoomsToRent: count, registerRoomDetails: true, rooms, currentRoomIndex: 0 }));
                    }}
                    aria-pressed={selected}
                    className={`relative h-20 rounded-2xl border transition flex items-center justify-center text-[#0a2a5c] ${
                      selected
                        ? "border-[#FFDC30] bg-yellow-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {selected && (
                      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#FFDC30] text-[#0a2a5c] text-sm font-bold flex items-center justify-center">
                        ✓
                      </span>
                    )}
                    <div className="text-3xl font-extrabold">{v}</div>
                  </button>
                );
              })}

              {(() => {
                const selected = data.numRoomsToRent >= 6;
                return (
                  <button
                    type="button"
                    onClick={() => {
                      const rooms = Array.from({ length: 6 }, () => ({
                        hasFurniture: null,
                        furniture: [],
                        furnitureOtroInput: "",
                        bedType: "",
                        roomPhoto: [],
                        bathroomPhoto: [],
                        bathroomType: "",
                        bedroomType: "",
                        sharedWithCount: 2,
                        price: 5000,
                      }));
                      setData((d) => ({ ...d, numRoomsToRent: 6, registerRoomDetails: true, rooms, currentRoomIndex: 0 }));
                    }}
                    aria-pressed={selected}
                    className={`relative h-20 rounded-2xl border transition flex items-center justify-center text-[#0a2a5c] ${
                      selected
                        ? "border-[#FFDC30] bg-yellow-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {selected && (
                      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#FFDC30] text-[#0a2a5c] text-sm font-bold flex items-center justify-center">
                        ✓
                      </span>
                    )}
                    <div className="text-center leading-tight">
                      <div className="text-2xl font-extrabold">6</div>
                      <div className="text-sm font-semibold text-gray-600 -mt-1">o más</div>
                    </div>
                  </button>
                );
              })()}
            </div>
            {data.numRoomsToRent >= 6 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <label className="block text-sm font-medium text-[#0a2a5c] mb-2">¿Cuántas habitaciones deseas registrar?</label>
                <input
                  type="number"
                  min={6}
                  value={data.numRoomsToRent}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10) || 6;
                    const rooms = Array.from({ length: value }, () => ({
                      hasFurniture: null,
                      furniture: [],
                      furnitureOtroInput: "",
                      bedType: "",
                      roomPhoto: [],
                      bathroomPhoto: [],
                      bathroomType: "",
                      bedroomType: "",
                      sharedWithCount: 2,
                      price: 5000,
                    }));
                    setData((d) => ({ ...d, numRoomsToRent: value, registerRoomDetails: true, rooms, currentRoomIndex: 0 }));
                  }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30] text-center text-lg font-bold text-[#0a2a5c]"
                  placeholder="Escribe el número"
                />
                <p className="text-xs text-gray-500 mt-2">Mínimo 6</p>
              </div>
            )}
          </div>
        ),
      });
    }

    // Remove furnished from here - will be added after common areas
    // The furnished question is now added after common areas for each property type

    base.push({
      key: "servicesIncluded",
      title: "¿Incluye servicios?",
      canContinue: data.servicesIncluded !== null && (data.servicesIncluded === false || data.includedServices.length > 0),
      render: () => (
        <div className="space-y-4">
          <ChoiceGrid
            value={data.servicesIncluded}
            onChange={(v) => setData((d) => ({ ...d, servicesIncluded: v, includedServices: [] }))}
            cols={2}
            options={[
              {
                value: true,
                label: "Sí",
                icon: <span className="text-lg">✅</span>,
              },
              {
                value: false,
                label: "No",
                icon: <span className="text-lg">❌</span>,
              },
            ]}
          />
          {data.servicesIncluded === true && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Qué servicios incluye?</label>
              <CheckboxList
                options={INCLUDED_SERVICES.filter(s => s !== "Todos los servicios")}
                values={data.includedServices.filter(s => s !== "Todos los servicios")}
                onToggle={(opt) => {
                  // Si se selecciona/deselecciona un servicio individual
                  setData((d) => {
                    const newServices = d.includedServices.includes(opt)
                      ? d.includedServices.filter((x) => x !== opt)
                      : [...d.includedServices, opt];
                    
                    // Si todos los servicios individuales están seleccionados, agregar "Todos los servicios"
                    const individualServices = INCLUDED_SERVICES.filter(s => s !== "Todos los servicios");
                    const allSelected = individualServices.every(s => newServices.includes(s));
                    
                    if (allSelected && !newServices.includes("Todos los servicios")) {
                      return { ...d, includedServices: [...newServices, "Todos los servicios"] };
                    }
                    
                    // Si se deselecciona un servicio individual, quitar "Todos los servicios" si está
                    const withoutTodos = newServices.filter(s => s !== "Todos los servicios");
                    return { ...d, includedServices: withoutTodos };
                  });
                }}
                getIcon={getServiciosIcon}
              />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    data.includedServices.includes("Todos los servicios")
                      ? "border-[#FFDC30] bg-yellow-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.includedServices.includes("Todos los servicios")}
                    onChange={() => {
                      setData((d) => {
                        const isSelected = d.includedServices.includes("Todos los servicios");
                        if (isSelected) {
                          // Si se deselecciona "Todos los servicios", limpiar todo
                          return { ...d, includedServices: [] };
                        } else {
                          // Si se selecciona "Todos los servicios", seleccionar todos
                          return { ...d, includedServices: INCLUDED_SERVICES };
                        }
                      });
                    }}
                    className="accent-[#FFDC30] w-4 h-4"
                  />
                  <span className="text-lg mr-1">✅</span>
                  <span className="text-sm font-bold text-[#0a2a5c]">Todos los servicios</span>
                </label>
              </div>
            </div>
          )}
        </div>
      ),
    });

    base.push({
      key: "genderCompatible",
      title: "Género compatible",
      canContinue: !!data.genderCompatible,
      render: () => (
        <ChoiceGrid
          value={data.genderCompatible}
          onChange={(v) => setData((d) => ({ ...d, genderCompatible: v }))}
          cols={3}
          options={[
            {
              value: "Solo hombres",
              label: "Solo hombres",
              icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 3h5v5m0-5-6 6M11 7a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
                </svg>
              ),
            },
            {
              value: "Solo mujeres",
              label: "Solo mujeres",
              icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 0v9m-3-3h6"
                  />
                </svg>
              ),
            },
            {
              value: "Mixto",
              label: "Mixto",
              icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
          ]}
        />
      ),
    });

    base.push({
      key: "petFriendly",
      title: "¿Es Pet Friendly?",
      subtitle: "(¿Se admiten mascotas?)",
      canContinue: data.petFriendly !== null && (data.petFriendly === false || data.mascotasPermitidas.length > 0),
      render: () => (
        <div className="space-y-4">
          <YesNo 
            value={data.petFriendly} 
            onChange={(v) => setData((d) => ({ ...d, petFriendly: v, mascotasPermitidas: [] }))} 
          />
          {data.petFriendly === true && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Cuáles?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MASCOTAS_OPTIONS.map((opt) => {
                  const checked = data.mascotasPermitidas.includes(opt);
                  const getIcon = (pet) => {
                    if (pet === "Perros") return "🐕";
                    if (pet === "Gatos") return "🐈";
                    if (pet === "Reptiles") return "🦎";
                    if (pet === "Roedores") return "🐹";
                    return "";
                  };
                  return (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        checked ? "border-[#FFDC30] bg-yellow-50" : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setData((d) => ({
                            ...d,
                            mascotasPermitidas: d.mascotasPermitidas.includes(opt)
                              ? d.mascotasPermitidas.filter((x) => x !== opt)
                              : [...d.mascotasPermitidas, opt],
                          }))
                        }
                        className="accent-[#FFDC30] w-4 h-4"
                      />
                      <span className="text-2xl">{getIcon(opt)}</span>
                      <span className="text-sm text-[#0a2a5c]">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ),
    });

    // Add number of rooms step for Casa/Departamento (after pet friendly)
    if (data.propertyType === "Casa" || data.propertyType === "Departamento") {
      base.push({
        key: "numRooms",
        title: "¿Cuántas habitaciones tiene? 🛏️",
        canContinue: data.numRooms >= 1,
        render: () => (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
              onClick={() => setData((d) => ({ ...d, numRooms: Math.max(1, d.numRooms - 1) }))}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <div className="text-3xl font-bold text-[#0a2a5c] min-w-[60px] text-center">{data.numRooms}</div>
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
              onClick={() => setData((d) => ({ ...d, numRooms: Math.min(20, d.numRooms + 1) }))}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        ),
      });
    }

    if (data.propertyType === "Casa" || data.propertyType === "Departamento" || data.propertyType === "Loft") {
      base.push({
        key: "bathroomsCount",
        title: "Baños",
        canContinue: data.banosCompletos >= 1,
        render: () => (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Número de baños completos 🚿</label>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
                  onClick={() => setData((d) => ({ ...d, banosCompletos: Math.max(1, d.banosCompletos - 1) }))}
                >
                  −
                </button>
                <div className="text-xl font-bold text-[#0a2a5c]">{data.banosCompletos}</div>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
                  onClick={() => setData((d) => ({ ...d, banosCompletos: Math.min(10, d.banosCompletos + 1) }))}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Número de baños medios 🚽</label>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
                  onClick={() => setData((d) => ({ ...d, banosMedios: Math.max(0, d.banosMedios - 1) }))}
                >
                  −
                </button>
                <div className="text-xl font-bold text-[#0a2a5c]">{data.banosMedios}</div>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
                  onClick={() => setData((d) => ({ ...d, banosMedios: Math.min(10, d.banosMedios + 1) }))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ),
      });

      base.push({
        key: "parkingSpaces",
        title: "Lugares de estacionamiento 🅿️",
        canContinue: data.parkingSpaces >= 0,
        render: () => (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
              onClick={() => setData((d) => ({ ...d, parkingSpaces: Math.max(0, d.parkingSpaces - 1) }))}
            >
              −
            </button>
            <div className="text-xl font-bold text-[#0a2a5c]">{data.parkingSpaces}</div>
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
              onClick={() => setData((d) => ({ ...d, parkingSpaces: Math.min(10, d.parkingSpaces + 1) }))}
            >
              +
            </button>
          </div>
        ),
      });

      base.push({
        key: "espaciosComunes",
        title: data.propertyType === "Casa" 
          ? "¿Qué espacios comunes tiene la casa?"
          : data.propertyType === "Departamento"
          ? "¿Qué espacios comunes tiene el departamento?"
          : "¿Qué espacios comunes tiene?",
        canContinue: true,
        render: () => (
          <div className="space-y-4">
            <CheckboxList
              options={ESPACIOS_COMUNES}
              values={data.espaciosComunes}
              onToggle={(opt) =>
                setData((d) => ({
                  ...d,
                  espaciosComunes: d.espaciosComunes.includes(opt)
                    ? d.espaciosComunes.filter((x) => x !== opt)
                    : [...d.espaciosComunes, opt],
                }))
              }
              getIcon={getEspaciosComunesIcon}
            />
            <div>
              <label className="block text-sm font-medium text-[#0a2a5c] mb-2">Otra</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
                placeholder="Escribe otro espacio común"
                value={data.espaciosComunesOtro}
                onChange={(e) => setData((d) => ({ ...d, espaciosComunesOtro: e.target.value }))}
              />
            </div>
          </div>
        ),
      });
    } else if (data.propertyType === "Cuarto") {
      base.push({
        key: "parkingSpacesRoom",
        title: "¿Incluye estacionamiento?",
        canContinue: true,
        render: () => (
          <YesNo
            value={data.parkingSpaces > 0}
            onChange={(v) => setData((d) => ({ ...d, parkingSpaces: v ? 1 : 0 }))}
          />
        ),
      });
    }

    // First step: Amenities of the house
    base.push({
      key: "amenitiesHouse",
      title: data.propertyType === "Departamento" 
        ? "Amenidades del departamento (cosas extra que la hacen mejor)"
        : "Amenidades de la casa (cosas extra que la hacen mejor)",
      canContinue: true,
      render: () => (
        <div className="space-y-4">
          <CheckboxList
            options={AMENIDADES_CASA}
            values={data.amenidadesCasa}
            onToggle={(opt) =>
              setData((d) => ({
                ...d,
                amenidadesCasa: d.amenidadesCasa.includes(opt)
                  ? d.amenidadesCasa.filter((x) => x !== opt)
                  : [...d.amenidadesCasa, opt],
              }))
            }
            getIcon={getAmenidadesCasaIcon}
          />
          <div className="mt-3">
            <label className="block text-sm font-medium text-[#0a2a5c] mb-2">Otra</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
              placeholder="Escribe otra amenidad"
              value={data.amenidadesCasaOtro}
              onChange={(e) => setData((d) => ({ ...d, amenidadesCasaOtro: e.target.value }))}
            />
          </div>
        </div>
      ),
    });

    // Second step: Amenities of building/community (clubhouse/building)
    base.push({
      key: "amenitiesCommon",
      title: "Amenidades del edificio / condominio",
      canContinue: true,
      render: () => (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Tiene Casa Club?</label>
            <YesNo
              value={data.tieneCasaClub}
              onChange={(v) => {
                setData((d) => ({
                  ...d,
                  tieneCasaClub: v,
                  amenidadesCasaClub: v ? d.amenidadesCasaClub : [],
                  amenidadesCasaClubOtro: v ? d.amenidadesCasaClubOtro : "",
                  fotoCasaClub: v ? d.fotoCasaClub : null,
                }));
              }}
            />
            {data.tieneCasaClub && (
              <div className="mt-4">
                <PhotoUpload
                  label="Foto del Casa Club (opcional)"
                  multiple={false}
                  value={data.fotoCasaClub}
                  onChange={(file) => setData((d) => ({ ...d, fotoCasaClub: file }))}
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Amenidades</label>
            <CheckboxList
              options={AMENIDADES_CASA_CLUB}
              values={data.amenidadesCasaClub}
              onToggle={(opt) =>
                setData((d) => ({
                  ...d,
                  amenidadesCasaClub: d.amenidadesCasaClub.includes(opt)
                    ? d.amenidadesCasaClub.filter((x) => x !== opt)
                    : [...d.amenidadesCasaClub, opt],
                }))
              }
              getIcon={getAmenidadesCasaClubIcon}
            />
            <div className="mt-3">
              <label className="block text-sm font-medium text-[#0a2a5c] mb-2">Otra</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
                placeholder="Escribe otra amenidad"
                value={data.amenidadesCasaClubOtro}
                onChange={(e) => setData((d) => ({ ...d, amenidadesCasaClubOtro: e.target.value }))}
              />
            </div>
          </div>

          <div className="mt-4">
            <PhotoUpload
              label="Fotos de áreas comunes del edificio / condominio (opcional)"
              description="Sube fotos de las áreas comunes del edificio o condominio (no de tu casa/departamento)"
              multiple
              value={data.fotosAreasComunes}
              onChange={(files) => setData((d) => ({ ...d, fotosAreasComunes: files }))}
              maxPreview={6}
            />
          </div>
        </div>
      ),
    });

    base.push({
      key: "securityType",
      title: "Seguridad",
      canContinue: true,
      render: () => {
        const isCasa = data.propertyType === "Casa";
        const isEdificio = data.propertyType === "Departamento" || data.propertyType === "Loft";
        const isCuarto = data.propertyType === "Cuarto";
        const soloCondominio = isCasa || (isCuarto && data.dentroDe === "Casa");
        const soloEdificio = isEdificio || (isCuarto && data.dentroDe === "Departamento");
        const options = [];
        if (soloCondominio) {
          options.push({ value: SECURITY_CONDOMINIO, label: SECURITY_CONDOMINIO, icon: <IconGuardiaCaseta /> });
        }
        if (soloEdificio) {
          options.push({ value: SECURITY_EDIFICIO, label: SECURITY_EDIFICIO, icon: <IconGuardiaCaseta /> });
        }
        if (!soloCondominio && !soloEdificio) {
          options.push({ value: SECURITY_CONDOMINIO, label: SECURITY_CONDOMINIO, icon: <IconGuardiaCaseta /> });
          options.push({ value: SECURITY_EDIFICIO, label: SECURITY_EDIFICIO, icon: <IconGuardiaCaseta /> });
        }
        options.push({ value: SECURITY_NA, label: SECURITY_NA, icon: <IconNoAplica /> });
        const validValues = options.map((o) => o.value);
        const value = validValues.includes(data.securityType) ? data.securityType : "";
        return (
          <ChoiceGrid
            value={value}
            onChange={(v) => setData((d) => ({ ...d, securityType: v }))}
            options={options}
          />
        );
      },
    });

    // General house photos step
    base.push({
      key: "photos",
      title: "Fotos generales de la casa",
      canContinue: true,
      render: () => (
        <PhotoUpload
          description="Sube fotos de la casa en general"
          multiple
          value={data.photos}
          onChange={(files) => setData((d) => ({ ...d, photos: files }))}
          maxPreview={6}
        />
      ),
    });

    // Descripción corta (justo después de fotos generales); título según casa/departamento
    base.push({
      key: "description",
      title: data.propertyType === "Casa"
        ? "Descripción corta de la casa"
        : data.propertyType === "Departamento"
        ? "Descripción corta del departamento"
        : "Descripción corta",
      canContinue: data.description.trim().length >= 10,
      render: () => (
        <textarea
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
          placeholder="Ej. Ideal para estudiantes, zona tranquila, cerca de transporte..."
          value={data.description}
          onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
        />
      ),
    });

    // Helper: step for "Fotos de habitaciones y baños" (only when NOT registering each room individually)
    const fotosHabitacionesStep = {
      key: "fotosHabitaciones",
      title: "Fotos de habitaciones y baños",
      canContinue: true,
      render: () => (
        <PhotoUpload
          description="Sube fotos de las habitaciones y baños"
          multiple
          value={data.fotosHabitaciones}
          onChange={(files) => setData((d) => ({ ...d, fotosHabitaciones: files }))}
          maxPreview={6}
        />
      ),
    };

    // Cuarto: registrar información específica de cada habitación (directo)
    if (data.propertyType === "Cuarto" && data.numRoomsToRent > 0 && data.rooms.length > 0) {
      data.rooms.forEach((room, index) => {
        const formatNumber = (num) => {
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        base.push({
          key: `room-${index}`,
          title: `Habitación ${index + 1} de ${data.rooms.length}`,
          canContinue: room.hasFurniture !== null && room.bathroomType !== "" && room.bedroomType !== "" && room.price >= 1000 && (room.bedroomType !== "Compartida" || (room.sharedWithCount >= 2 && room.sharedWithCount <= 10)),
          render: () => (
            <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Precio mensual</label>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <div className="relative border-2 border-gray-300 rounded-xl px-3 py-3 bg-white" style={{ width: '200px' }}>
                        <span className="absolute left-3 text-lg font-bold text-[#0a2a5c]">$</span>
                        <input
                          type="text"
                          value={room.price > 0 ? formatNumber(room.price) : ''}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/[^0-9]/g, '');
                            const numValue = parseInt(rawValue, 10) || 0;
                            const newRooms = [...data.rooms];
                            newRooms[index] = { ...room, price: numValue };
                            setData((d) => ({ ...d, rooms: newRooms }));
                          }}
                          onBlur={() => {
                            if (room.price < 1000) {
                              const newRooms = [...data.rooms];
                              newRooms[index] = { ...room, price: 5000 };
                              setData((d) => ({ ...d, rooms: newRooms }));
                            }
                          }}
                          className="w-full text-center text-lg font-bold text-[#0a2a5c] bg-transparent border-0 outline-none focus:outline-none pl-6"
                          placeholder="5,000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <PhotoUpload
                    label="Foto de la habitación"
                    multiple
                    maxFiles={3}
                    value={room.roomPhoto || []}
                    onChange={(files) => {
                      const newRooms = [...data.rooms];
                      newRooms[index] = { ...room, roomPhoto: files };
                      setData((d) => ({ ...d, rooms: newRooms }));
                    }}
                    maxPreview={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Tiene muebles?</label>
                  <YesNo
                    value={room.hasFurniture}
                    onChange={(v) => {
                      const newRooms = [...data.rooms];
                      newRooms[index] = { ...room, hasFurniture: v, furniture: v ? room.furniture : [] };
                      setData((d) => ({ ...d, rooms: newRooms }));
                    }}
                  />
                </div>

                {room.hasFurniture === true && (
                  <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                    <label className="block text-sm font-medium text-[#0a2a5c]">¿Qué muebles tiene?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FURNITURE_OPTIONS.map((opt) => {
                        const checked = (room.furniture || []).includes(opt);
                        const icon = getFurnitureIcon(opt);
                        return (
                          <div key={opt}>
                            <label
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                                checked ? "border-[#FFDC30] bg-yellow-50" : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  const newRooms = [...data.rooms];
                                  const currentFurniture = room.furniture || [];
                                  const standard = currentFurniture.filter((f) => FURNITURE_OPTIONS.includes(f));
                                  const otros = currentFurniture.filter((f) => !FURNITURE_OPTIONS.includes(f));
                                  const newStandard = standard.includes(opt)
                                    ? standard.filter((f) => f !== opt)
                                    : [...standard, opt];
                                  const removingCama = opt === "Cama" && standard.includes("Cama");
                                  newRooms[index] = {
                                    ...room,
                                    furniture: [...newStandard, ...otros],
                                    bedType: removingCama ? "" : room.bedType,
                                  };
                                  setData((d) => ({ ...d, rooms: newRooms }));
                                }}
                                className="accent-[#FFDC30] w-4 h-4"
                              />
                              {icon && (
                                <span className="inline-flex items-center justify-center w-7 h-7 shrink-0 text-lg">
                                  {icon}
                                </span>
                              )}
                              <span className="text-sm text-[#0a2a5c]">{opt}</span>
                            </label>
                            {opt === "Cama" && (room.furniture || []).includes("Cama") && (
                              <div className="ml-6 mt-1 mb-2">
                                <p className="text-xs text-gray-500 mb-1">Tipo de cama</p>
                                <div className="flex flex-wrap gap-1">
                                  {BED_TYPE_OPTIONS.map((t) => (
                                    <button
                                      key={t}
                                      type="button"
                                      onClick={() => {
                                        const newRooms = [...data.rooms];
                                        newRooms[index] = { ...room, bedType: t };
                                        setData((d) => ({ ...d, rooms: newRooms }));
                                      }}
                                      className={`px-2 py-1 rounded-lg text-xs font-medium transition ${
                                        room.bedType === t
                                          ? "bg-[#FFDC30] text-[#0a2a5c]"
                                          : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                                      }`}
                                    >
                                      {t}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <label className="block text-sm font-medium text-[#0a2a5c] mb-2">➕ Otros</label>
                      <p className="text-xs text-gray-500 mb-2">Escribe y agrega cada mueble u objeto extra</p>
                      <div className="flex gap-2 flex-wrap">
                        <input
                          type="text"
                          value={room.furnitureOtroInput ?? ""}
                          onChange={(e) => {
                            const newRooms = [...data.rooms];
                            newRooms[index] = { ...room, furnitureOtroInput: e.target.value };
                            setData((d) => ({ ...d, rooms: newRooms }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const text = (room.furnitureOtroInput ?? "").trim();
                              if (!text) return;
                              const items = text.split(/[,]+/).map((s) => s.trim()).filter(Boolean);
                              if (items.length === 0) return;
                              const newRooms = [...data.rooms];
                              const newFurniture = [...(room.furniture || []), ...items];
                              newRooms[index] = { ...room, furniture: newFurniture, furnitureOtroInput: "" };
                              setData((d) => ({ ...d, rooms: newRooms }));
                            }
                          }}
                          placeholder="Ej. Mesa de noche, estante (separa con coma)"
                          className="flex-1 min-w-[140px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const text = (room.furnitureOtroInput ?? "").trim();
                            if (!text) return;
                            const items = text.split(/[,]+/).map((s) => s.trim()).filter(Boolean);
                            if (items.length === 0) return;
                            const newRooms = [...data.rooms];
                            const newFurniture = [...(room.furniture || []), ...items];
                            newRooms[index] = { ...room, furniture: newFurniture, furnitureOtroInput: "" };
                            setData((d) => ({ ...d, rooms: newRooms }));
                          }}
                          className="px-4 py-2 rounded-lg bg-[#0a2a5c] text-white text-sm font-medium hover:bg-[#0a2a5c]/90"
                        >
                          Agregar
                        </button>
                      </div>
                      {(room.furniture || []).filter((f) => !FURNITURE_OPTIONS.includes(f)).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(room.furniture || []).filter((f) => !FURNITURE_OPTIONS.includes(f)).map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a2a5c]/10 text-[#0a2a5c] text-sm"
                            >
                              {item}
                              <button
                                type="button"
                                onClick={() => {
                                  const newRooms = [...data.rooms];
                                  const newFurniture = (room.furniture || []).filter((f) => f !== item);
                                  newRooms[index] = { ...room, furniture: newFurniture };
                                  setData((d) => ({ ...d, rooms: newRooms }));
                                }}
                                className="ml-0.5 text-gray-500 hover:text-red-600"
                                aria-label="Quitar"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Es para una sola persona o compartida?</label>
                  <ChoiceGrid
                    value={room.bedroomType}
                    onChange={(v) => {
                      const newRooms = [...data.rooms];
                      newRooms[index] = {
                        ...room,
                        bedroomType: v,
                        sharedWithCount: v === "Compartida" ? (room.sharedWithCount >= 2 ? room.sharedWithCount : 2) : 0,
                      };
                      setData((d) => ({ ...d, rooms: newRooms }));
                    }}
                    options={[
                      { value: "Una sola persona", label: "Una sola persona", icon: "👤" },
                      { value: "Compartida", label: "Compartida", icon: "👥" },
                    ]}
                  />
                  {room.bedroomType === "Compartida" && (
                    <div className="mt-3 ml-1">
                      <label className="block text-xs font-medium text-[#0a2a5c] mb-2">¿Con cuántas personas se comparte la habitación?</label>
                      <div className="flex flex-wrap gap-2">
                        {[2, 3, 4, 5, 6].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => {
                              const newRooms = [...data.rooms];
                              newRooms[index] = { ...room, sharedWithCount: n };
                              setData((d) => ({ ...d, rooms: newRooms }));
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              room.sharedWithCount === n
                                ? "bg-[#FFDC30] text-[#0a2a5c]"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                        <input
                          type="number"
                          min={7}
                          max={10}
                          value={room.sharedWithCount >= 7 && room.sharedWithCount <= 10 ? String(room.sharedWithCount) : ""}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 2 && val <= 10) {
                              const newRooms = [...data.rooms];
                              newRooms[index] = { ...room, sharedWithCount: val };
                              setData((d) => ({ ...d, rooms: newRooms }));
                            }
                          }}
                          placeholder="7+"
                          className="w-14 px-2 py-2 rounded-lg text-sm border border-gray-200 text-center focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <PhotoUpload
                    label="Foto del baño"
                    multiple
                    maxFiles={2}
                    value={room.bathroomPhoto || []}
                    onChange={(files) => {
                      const newRooms = [...data.rooms];
                      newRooms[index] = { ...room, bathroomPhoto: files };
                      setData((d) => ({ ...d, rooms: newRooms }));
                    }}
                    maxPreview={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Tipo de baño</label>
                  <ChoiceGrid
                    value={room.bathroomType}
                    onChange={(v) => {
                      const newRooms = [...data.rooms];
                      newRooms[index] = { ...room, bathroomType: v };
                      setData((d) => ({ ...d, rooms: newRooms }));
                    }}
                    options={[
                      { value: "Propio", label: "Propio", icon: <IconBanoPropio /> },
                      { value: "Compartido", label: "Compartido", icon: <IconBanoCompartido /> },
                    ]}
                  />
                </div>
              </div>
          ),
        });
      });
    }

    // Casa/Departamento: pregunta siempre visible para poder cambiar. Si No → fotos; Si Sí → pasos por habitación.
    if ((data.propertyType === "Casa" || data.propertyType === "Departamento") && data.numRooms > 0) {
      base.push({
        key: "registerBedroomDetails",
        title: "¿Quieres registrar información específica de cada habitación?",
        canContinue: data.registerBedroomDetails !== null,
        render: () => (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Puedes cambiar esta opción más adelante si lo necesitas.</p>
            <YesNo
              value={data.registerBedroomDetails}
              onChange={(v) => {
                if (v === true) {
                  const bedrooms = Array.from({ length: data.numRooms }, () => ({
                    hasFurniture: null,
                    furniture: [],
                    furnitureOtroInput: "",
                    bedType: "",
                    roomPhoto: [],
                    bathroomPhoto: [],
                    bathroomType: "",
                    bedroomType: "",
                    sharedWithCount: 2,
                  }));
                  setData((d) => ({ ...d, registerBedroomDetails: v, bedrooms, currentBedroomIndex: 0 }));
                } else {
                  setData((d) => ({ ...d, registerBedroomDetails: v, bedrooms: [], currentBedroomIndex: 0 }));
                }
              }}
            />
          </div>
        ),
      });
      if (data.registerBedroomDetails === false) {
        base.push(fotosHabitacionesStep);
      } else if (data.registerBedroomDetails === true && data.bedrooms.length > 0) {
        // Register details for each bedroom - add all bedroom steps
        data.bedrooms.forEach((bedroom, index) => {
          base.push({
            key: `bedroom-${index}`,
            title: `Habitación ${index + 1} de ${data.bedrooms.length}`,
            canContinue: bedroom.hasFurniture !== null && bedroom.bathroomType !== "" && bedroom.bedroomType !== "" && (bedroom.bedroomType !== "Compartida" || (bedroom.sharedWithCount >= 2 && bedroom.sharedWithCount <= 10)),
            render: () => (
              <div className="space-y-6">
                <div>
                  <PhotoUpload
                    label="Foto de la habitación"
                    multiple
                    maxFiles={3}
                    value={bedroom.roomPhoto || []}
                    onChange={(files) => {
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = { ...bedroom, roomPhoto: files };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                    maxPreview={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Tiene muebles?</label>
                    <YesNo
                    value={bedroom.hasFurniture}
                    onChange={(v) => {
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = { ...bedroom, hasFurniture: v, furniture: v ? bedroom.furniture : [], furnitureOtroInput: v ? (bedroom.furnitureOtroInput ?? "") : "" };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                  />
                </div>

                {bedroom.hasFurniture === true && (
                  <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                    <label className="block text-sm font-medium text-[#0a2a5c]">¿Qué muebles tiene?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FURNITURE_OPTIONS.map((opt) => {
                        const checked = (bedroom.furniture || []).includes(opt);
                        const icon = getFurnitureIcon(opt);
                        return (
                          <div key={opt}>
                            <label
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                                checked ? "border-[#FFDC30] bg-yellow-50" : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  const newBedrooms = [...data.bedrooms];
                                  const currentFurniture = bedroom.furniture || [];
                                  const standard = currentFurniture.filter((f) => FURNITURE_OPTIONS.includes(f));
                                  const otros = currentFurniture.filter((f) => !FURNITURE_OPTIONS.includes(f));
                                  const newStandard = standard.includes(opt)
                                    ? standard.filter((f) => f !== opt)
                                    : [...standard, opt];
                                  const removingCama = opt === "Cama" && standard.includes("Cama");
                                  newBedrooms[index] = {
                                    ...bedroom,
                                    furniture: [...newStandard, ...otros],
                                    bedType: removingCama ? "" : bedroom.bedType,
                                  };
                                  setData((d) => ({ ...d, bedrooms: newBedrooms }));
                                }}
                                className="accent-[#FFDC30] w-4 h-4"
                              />
                              {icon && (
                                <span className="inline-flex items-center justify-center w-7 h-7 shrink-0 text-lg">
                                  {icon}
                                </span>
                              )}
                              <span className="text-sm text-[#0a2a5c]">{opt}</span>
                            </label>
                            {opt === "Cama" && (bedroom.furniture || []).includes("Cama") && (
                              <div className="ml-6 mt-1 mb-2">
                                <p className="text-xs text-gray-500 mb-1">Tipo de cama</p>
                                <div className="flex flex-wrap gap-1">
                                  {BED_TYPE_OPTIONS.map((t) => (
                                    <button
                                      key={t}
                                      type="button"
                                      onClick={() => {
                                        const newBedrooms = [...data.bedrooms];
                                        newBedrooms[index] = { ...bedroom, bedType: t };
                                        setData((d) => ({ ...d, bedrooms: newBedrooms }));
                                      }}
                                      className={`px-2 py-1 rounded-lg text-xs font-medium transition ${
                                        bedroom.bedType === t
                                          ? "bg-[#FFDC30] text-[#0a2a5c]"
                                          : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                                      }`}
                                    >
                                      {t}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <label className="block text-sm font-medium text-[#0a2a5c] mb-2">➕ Otros</label>
                      <p className="text-xs text-gray-500 mb-2">Escribe y agrega cada mueble u objeto extra</p>
                      <div className="flex gap-2 flex-wrap">
                        <input
                          type="text"
                          value={bedroom.furnitureOtroInput ?? ""}
                          onChange={(e) => {
                            const newBedrooms = [...data.bedrooms];
                            newBedrooms[index] = { ...bedroom, furnitureOtroInput: e.target.value };
                            setData((d) => ({ ...d, bedrooms: newBedrooms }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const text = (bedroom.furnitureOtroInput ?? "").trim();
                              if (!text) return;
                              const items = text.split(/[,]+/).map((s) => s.trim()).filter(Boolean);
                              if (items.length === 0) return;
                              const newBedrooms = [...data.bedrooms];
                              const newFurniture = [...(bedroom.furniture || []), ...items];
                              newBedrooms[index] = { ...bedroom, furniture: newFurniture, furnitureOtroInput: "" };
                              setData((d) => ({ ...d, bedrooms: newBedrooms }));
                            }
                          }}
                          placeholder="Ej. Mesa de noche, estante (separa con coma)"
                          className="flex-1 min-w-[140px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const text = (bedroom.furnitureOtroInput ?? "").trim();
                            if (!text) return;
                            const items = text.split(/[,]+/).map((s) => s.trim()).filter(Boolean);
                            if (items.length === 0) return;
                            const newBedrooms = [...data.bedrooms];
                            const newFurniture = [...(bedroom.furniture || []), ...items];
                            newBedrooms[index] = { ...bedroom, furniture: newFurniture, furnitureOtroInput: "" };
                            setData((d) => ({ ...d, bedrooms: newBedrooms }));
                          }}
                          className="px-4 py-2 rounded-lg bg-[#0a2a5c] text-white text-sm font-medium hover:bg-[#0a2a5c]/90"
                        >
                          Agregar
                        </button>
                      </div>
                      {(bedroom.furniture || []).filter((f) => !FURNITURE_OPTIONS.includes(f)).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(bedroom.furniture || []).filter((f) => !FURNITURE_OPTIONS.includes(f)).map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a2a5c]/10 text-[#0a2a5c] text-sm"
                            >
                              {item}
                              <button
                                type="button"
                                onClick={() => {
                                  const newBedrooms = [...data.bedrooms];
                                  const newFurniture = (bedroom.furniture || []).filter((f) => f !== item);
                                  newBedrooms[index] = { ...bedroom, furniture: newFurniture };
                                  setData((d) => ({ ...d, bedrooms: newBedrooms }));
                                }}
                                className="ml-0.5 text-gray-500 hover:text-red-600"
                                aria-label="Quitar"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Es para una sola persona o compartida?</label>
                  <ChoiceGrid
                    value={bedroom.bedroomType}
                    onChange={(v) => {
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = {
                        ...bedroom,
                        bedroomType: v,
                        sharedWithCount: v === "Compartida" ? (bedroom.sharedWithCount >= 2 ? bedroom.sharedWithCount : 2) : 0,
                      };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                    options={[
                      { value: "Una sola persona", label: "Una sola persona", icon: "👤" },
                      { value: "Compartida", label: "Compartida", icon: "👥" },
                    ]}
                  />
                  {bedroom.bedroomType === "Compartida" && (
                    <div className="mt-3 ml-1">
                      <label className="block text-xs font-medium text-[#0a2a5c] mb-2">¿Con cuántas personas se comparte la habitación?</label>
                      <div className="flex flex-wrap gap-2">
                        {[2, 3, 4, 5, 6].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => {
                              const newBedrooms = [...data.bedrooms];
                              newBedrooms[index] = { ...bedroom, sharedWithCount: n };
                              setData((d) => ({ ...d, bedrooms: newBedrooms }));
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              bedroom.sharedWithCount === n
                                ? "bg-[#FFDC30] text-[#0a2a5c]"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                        <input
                          type="number"
                          min={7}
                          max={10}
                          value={bedroom.sharedWithCount >= 7 && bedroom.sharedWithCount <= 10 ? String(bedroom.sharedWithCount) : ""}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 2 && val <= 10) {
                              const newBedrooms = [...data.bedrooms];
                              newBedrooms[index] = { ...bedroom, sharedWithCount: val };
                              setData((d) => ({ ...d, bedrooms: newBedrooms }));
                            }
                          }}
                          placeholder="7+"
                          className="w-14 px-2 py-2 rounded-lg text-sm border border-gray-200 text-center focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <PhotoUpload
                    label="Foto del baño"
                    multiple
                    maxFiles={2}
                    value={bedroom.bathroomPhoto || []}
                    onChange={(files) => {
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = { ...bedroom, bathroomPhoto: files };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                    maxPreview={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Tipo de baño</label>
                  <ChoiceGrid
                    value={bedroom.bathroomType}
                    onChange={(v) => {
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = { ...bedroom, bathroomType: v };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                    options={[
                      { value: "Propio", label: "Propio", icon: <IconBanoPropio /> },
                      { value: "Compartido", label: "Compartido", icon: <IconBanoCompartido /> },
                    ]}
                  />
                </div>
              </div>
            ),
          });
        });
      }
    }

    // Fotos de habitaciones cuando no hay flujo por habitación: Loft, o Cuarto/Casa/Depa sin habitaciones a registrar
    const showFotosHabitacionesStandalone =
      data.propertyType === "Loft" ||
      (data.propertyType === "Cuarto" && data.numRoomsToRent === 0) ||
      ((data.propertyType === "Casa" || data.propertyType === "Departamento") && data.numRooms === 0);
    if (showFotosHabitacionesStandalone) {
      base.push(fotosHabitacionesStep);
    }

    return base;
  }, [
    data.propertyType,
    data.dentroDe,
    data.numRoomsToRent,
    data.rooms,
    data.currentRoomIndex,
    data.campus,
    data.numRooms,
    data.registerBedroomDetails,
    data.bedrooms,
    data.currentBedroomIndex,
    data.title,
    data.addressGeneral,
    data.calle,
    data.numero,
    data.colonia,
    data.ciudad,
    data.estado,
    data.codigoPostal,
    data.price,
    data.furnished,
    data.furnishedType,
    data.servicesIncluded,
    data.includedServices,
    data.petFriendly,
    data.mascotasPermitidas,
    data.bathroomTypeForRoom,
    data.bathroomsCount,
    data.banosCompletos,
    data.banosMedios,
    data.parkingSpaces,
    data.genderCompatible,
    data.amenities,
    data.amenidadesCasa,
    data.tieneCasaClub,
    data.amenidadesCasaClub,
    data.amenidadesCasaOtro,
    data.amenidadesCasaClubOtro,
    data.espaciosComunes,
    data.espaciosComunesOtro,
    data.securityType,
    data.photos,
    data.fotosHabitaciones,
    data.fotosAreasComunes,
    data.fotoCasaClub,
    data.description,
  ]);

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleFinish = () => {
    const features = [];

    if (data.furnished) features.push("Amueblada");
    if (data.servicesIncluded) features.push("Servicios incluidos");

    if (data.propertyType === "Cuarto") {
      if (data.bathroomTypeForRoom === "Propio") features.push("Baño privado");
      if (data.bathroomTypeForRoom === "Compartido") features.push("Baño compartido");
    } else {
      if (data.banosCompletos > 0) {
        features.push(`${data.banosCompletos} baño${data.banosCompletos > 1 ? 's' : ''} completo${data.banosCompletos > 1 ? 's' : ''}`);
      }
      if (data.banosMedios > 0) {
        features.push(`${data.banosMedios} baño${data.banosMedios > 1 ? 's' : ''} medio${data.banosMedios > 1 ? 's' : ''}`);
      }
      if (data.parkingSpaces > 0) features.push("Estacionamiento");
    }

    if (data.genderCompatible) features.push(data.genderCompatible);
    
    // Agregar amenidades de la casa
    data.amenidadesCasa.forEach((a) => features.push(a));
    
    // Agregar Casa Club si está seleccionado
    if (data.tieneCasaClub) {
      features.push("Casa Club");
      // Agregar amenidades de casa club
      data.amenidadesCasaClub.forEach((a) => features.push(a));
    }
    
    // Agregar otras amenidades si hay texto
    if (data.amenidadesCasaOtro && data.amenidadesCasaOtro.trim()) {
      features.push(data.amenidadesCasaOtro.trim());
    }
    if (data.amenidadesCasaClubOtro && data.amenidadesCasaClubOtro.trim()) {
      features.push(data.amenidadesCasaClubOtro.trim());
    }
    
    if (data.securityType) features.push("Seguridad 24/7");

    // Construir dirección completa
    const fullAddress = `${data.calle} ${data.numero}, ${data.colonia}, ${data.ciudad}, ${data.estado} ${data.codigoPostal}`.trim();

    const payload = {
      id: Date.now(),
      title: data.title,
      type: data.propertyType,
      price: data.price,
      location: data.description,
      image: data.photos[0] ? URL.createObjectURL(data.photos[0]) : "/125 sin título_20250717140421.png",
      features,
      includedServices: data.servicesIncluded ? data.includedServices : [],
      bathrooms: data.propertyType === "Cuarto" ? undefined : data.banosCompletos,
      banosCompletos: data.propertyType === "Cuarto" ? undefined : data.banosCompletos,
      banosMedios: data.propertyType === "Cuarto" ? undefined : data.banosMedios,
      petFriendly: !!data.petFriendly,
      parkingSpaces: data.parkingSpaces,
      securityType: data.securityType || undefined,
      addressGeneral: data.addressGeneral,
      address: fullAddress,
      addressDetails: {
        calle: data.calle,
        numero: data.numero,
        colonia: data.colonia,
        ciudad: data.ciudad,
        estado: data.estado,
        codigoPostal: data.codigoPostal,
      },
      dentroDe: data.dentroDe || undefined,
      numRoomsToRent: data.numRoomsToRent > 0 ? data.numRoomsToRent : undefined,
      rooms: data.rooms.length > 0 ? data.rooms : undefined,
      amenidadesCasa: data.amenidadesCasa,
      amenidadesCasaClub: data.amenidadesCasaClub,
      amenidadesCasaOtro: data.amenidadesCasaOtro || undefined,
      amenidadesCasaClubOtro: data.amenidadesCasaClubOtro || undefined,
      espaciosComunesOtro: data.espaciosComunesOtro || undefined,
      numRooms: data.numRooms || undefined,
      bedrooms: data.bedrooms.length > 0 ? data.bedrooms : undefined,
    };

    const existing = JSON.parse(localStorage.getItem("registeredProperties") || "[]");
    localStorage.setItem("registeredProperties", JSON.stringify([payload, ...existing]));

    if (onDone) onDone(payload);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-2xl font-bold text-[#0a2a5c]">Registrar mi propiedad</div>
            <div className="text-sm text-gray-600">Responde paso a paso. Rápido y sencillo.</div>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-lg border border-gray-200 text-[#0a2a5c] hover:border-gray-300"
          >
            Volver
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <ProgressBar current={step} total={steps.length} />

          <div className="mt-6">
            <div className="text-xl font-bold text-black mb-4">{current.title}</div>
            {current.subtitle && (
              <div className="text-sm text-gray-500 text-center mb-4">{current.subtitle}</div>
            )}
            {current.render()}
          </div>

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:border-gray-300"
              >
                ← Anterior
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              disabled={!current.canContinue}
              onClick={() => {
                if (!current.canContinue) return;
                if (isLast) handleFinish();
                else setStep((s) => s + 1);
              }}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                current.canContinue ? "bg-[#FFDC30] text-black hover:bg-yellow-400" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLast ? "Finalizar" : "Siguiente →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
