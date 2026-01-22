import React, { useMemo, useState } from "react";

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

const CheckboxList = ({ options, values, onToggle }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {options.map((opt) => {
      const checked = values.includes(opt);
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
          <span className="text-sm text-[#0a2a5c]">{opt}</span>
        </label>
      );
    })}
  </div>
);

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
  const SECURITY = [
    "Condominio privado con seguridad 24/7",
    "Edificio con seguridad 24/7",
    "No aplica",
  ];

  const FURNITURE_OPTIONS = ["Escritorio", "Cama", "Silla", "Espejo de cuerpo completo", "Armario"];
  const AMENITIES = [
    "Casa Club",
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
    amenidadesCasaClub: [],
    amenidadesCasaOtro: "",
    amenidadesCasaClubOtro: "",
    espaciosComunes: [],
    espaciosComunesOtro: "",
    securityType: "",
    photos: [],
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
          onChange={(v) => setData((d) => ({ ...d, propertyType: v, dentroDe: (v === "Cuarto" || v === "Loft") ? data.dentroDe : "" }))}
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
            onChange={(v) => setData((d) => ({ ...d, dentroDe: v }))}
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

    // Add "How many rooms to rent individually" step for Cuarto (right after dentroDe)
    if (data.propertyType === "Cuarto") {
      base.push({
        key: "numRoomsToRent",
        title: "¿Cuántas habitaciones deseas rentar individualmente?",
        canContinue: data.numRoomsToRent >= 1 && data.numRoomsToRent <= 5 ? true : (data.numRoomsToRent >= 6),
        render: () => (
          <div className="space-y-4">
            <ChoiceGrid
              value={data.numRoomsToRent <= 5 ? data.numRoomsToRent.toString() : "5 or more"}
              onChange={(v) => {
                if (v === "5 or more") {
                  setData((d) => ({ ...d, numRoomsToRent: 6 }));
                } else {
                  setData((d) => ({ ...d, numRoomsToRent: parseInt(v, 10) }));
                }
              }}
              cols={3}
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
                { value: "5 or more", label: "5 o más" },
              ]}
            />
            {data.numRoomsToRent >= 6 && (
              <div>
                <label className="block text-sm font-medium text-[#0a2a5c] mb-2">¿Cuántas habitaciones?</label>
                <input
                  type="number"
                  min={6}
                  value={data.numRoomsToRent}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10) || 6;
                    setData((d) => ({ ...d, numRoomsToRent: value, registerRoomDetails: null, rooms: [], currentRoomIndex: 0 }));
                  }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
                  placeholder="Escribe el número"
                />
              </div>
            )}
          </div>
        ),
      });
    }

    // Add number of rooms step for Casa/Departamento
    if (data.propertyType === "Casa" || data.propertyType === "Departamento") {
      base.push({
        key: "numRooms",
        title: "¿Cuántas habitaciones tiene?",
        canContinue: data.numRooms >= 1,
        render: () => (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
              onClick={() => setData((d) => ({ ...d, numRooms: Math.max(1, d.numRooms - 1) }))}
            >
              −
            </button>
            <div className="text-xl font-bold text-[#0a2a5c]">{data.numRooms}</div>
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300"
              onClick={() => setData((d) => ({ ...d, numRooms: Math.min(20, d.numRooms + 1) }))}
            >
              +
            </button>
          </div>
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
          <div>
            <p className="text-xs text-gray-500 mb-2">Pon la zona general aquí (nombre del condominio, o la zona)</p>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFDC30]"
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

    // Remove furnished from here - will be added after common areas
    // The furnished question is now added after common areas for each property type

    base.push({
      key: "servicesIncluded",
      title: "¿Incluye servicios?",
      canContinue: data.servicesIncluded !== null && (data.servicesIncluded === false || data.includedServices.length > 0),
      render: () => (
        <div className="space-y-4">
          <YesNo 
            value={data.servicesIncluded} 
            onChange={(v) => setData((d) => ({ ...d, servicesIncluded: v, includedServices: [] }))} 
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
                  <span className="text-sm font-bold text-[#0a2a5c]">Todos los servicios</span>
                </label>
              </div>
            </div>
          )}
        </div>
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

    if (data.propertyType === "Casa" || data.propertyType === "Departamento" || data.propertyType === "Loft") {
      base.push({
        key: "bathroomsCount",
        title: "Baños",
        canContinue: data.banosCompletos >= 1,
        render: () => (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Número de baños completos</label>
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
              <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Número de baños medios</label>
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
        title: "Lugares de estacionamiento",
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
        title: "¿Qué espacios comunes tiene?",
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
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 21v-4m0 0a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm-3 4h6" />
                </svg>
              ),
            },
            {
              value: "Mixto",
              label: "Mixto",
              icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 20c0-3 2-5 5-5s5 2 5 5M9 7a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
                </svg>
              ),
            },
          ]}
        />
      ),
    });

    base.push({
      key: "amenities",
      title: "Amenidades",
      canContinue: true,
      render: () => (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Amenidades de la casa</label>
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

          <div>
            <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Casa Club</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition border-gray-200 bg-white hover:border-gray-300">
                <input
                  type="checkbox"
                  checked={data.amenities.includes("Casa Club")}
                  onChange={(e) => {
                    setData((d) => ({
                      ...d,
                      amenities: e.target.checked
                        ? [...d.amenities, "Casa Club"]
                        : d.amenities.filter((x) => x !== "Casa Club"),
                      amenidadesCasaClub: e.target.checked ? d.amenidadesCasaClub : [],
                      amenidadesCasaClubOtro: e.target.checked ? d.amenidadesCasaClubOtro : "",
                    }));
                  }}
                  className="accent-[#FFDC30] w-4 h-4"
                />
                <span className="text-sm text-[#0a2a5c]">Casa Club</span>
              </label>
              {data.amenities.includes("Casa Club") && (
                <div className="ml-4 mt-2 space-y-3">
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
                  />
                  <div>
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
              )}
            </div>
          </div>
        </div>
      ),
    });

    base.push({
      key: "securityType",
      title: "Seguridad",
      canContinue: true,
      render: () => (
        <ChoiceGrid
          value={data.securityType}
          onChange={(v) => setData((d) => ({ ...d, securityType: v }))}
          options={SECURITY.map((s) => ({
            value: s,
            label: s,
            icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
              </svg>
            ),
          }))}
        />
      ),
    });

    base.push({
      key: "photos",
      title: "Fotos (opcional)",
      canContinue: true,
      render: () => (
        <div className="space-y-3">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setData((d) => ({ ...d, photos: Array.from(e.target.files || []) }))}
            className="w-full"
          />
          {data.photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.slice(0, 6).map((f, idx) => (
                <img
                  key={`${f.name}-${idx}`}
                  src={URL.createObjectURL(f)}
                  alt="preview"
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Puedes subirlas después.</div>
          )}
        </div>
      ),
    });

    // Add room details registration step for Cuarto (before description)
    if (data.propertyType === "Cuarto" && data.numRoomsToRent > 0) {
      // Ask if they want to register room details
      if (data.registerRoomDetails === null) {
        base.push({
          key: "registerRoomDetails",
          title: "¿Quieres registrar información específica de cada habitación?",
          canContinue: data.registerRoomDetails !== null,
          render: () => (
            <div className="space-y-4">
              <YesNo
                value={data.registerRoomDetails}
                onChange={(v) => {
                  if (v === true) {
                    // Initialize rooms array
                    const rooms = Array.from({ length: data.numRoomsToRent }, () => ({
                      hasFurniture: null,
                      furniture: [],
                      roomPhoto: null,
                      bathroomPhoto: null,
                      bathroomType: "",
                      bedroomType: "",
                      price: 5000,
                    }));
                    setData((d) => ({ ...d, registerRoomDetails: v, rooms, currentRoomIndex: 0 }));
                  } else {
                    setData((d) => ({ ...d, registerRoomDetails: v, rooms: [], currentRoomIndex: 0 }));
                  }
                }}
              />
            </div>
          ),
        });
      } else if (data.registerRoomDetails === true && data.rooms.length > 0) {
        // Register details for each room - add all room steps
        data.rooms.forEach((room, index) => {
          const formatNumber = (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          };

          base.push({
            key: `room-${index}`,
            title: `Habitación ${index + 1} de ${data.rooms.length}`,
            canContinue: room.hasFurniture !== null && room.bathroomType !== "" && room.bedroomType !== "" && room.price >= 1000,
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
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Foto de la habitación (opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      const newRooms = [...data.rooms];
                      newRooms[index] = { ...room, roomPhoto: file };
                      setData((d) => ({ ...d, rooms: newRooms }));
                    }}
                    className="w-full"
                  />
                  {room.roomPhoto && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(room.roomPhoto)}
                        alt="Room preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
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
                  <div>
                    <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Qué muebles tiene?</label>
                    <CheckboxList
                      options={FURNITURE_OPTIONS}
                      values={room.furniture || []}
                      onToggle={(opt) => {
                        const newRooms = [...data.rooms];
                        const currentFurniture = room.furniture || [];
                        const newFurniture = currentFurniture.includes(opt)
                          ? currentFurniture.filter((f) => f !== opt)
                          : [...currentFurniture, opt];
                        newRooms[index] = { ...room, furniture: newFurniture };
                        setData((d) => ({ ...d, rooms: newRooms }));
                      }}
                    />
                  </div>
                )}
                
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
                      { value: "Propio", label: "Propio" },
                      { value: "Compartido", label: "Compartido" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Foto del baño (opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      const newRooms = [...data.rooms];
                      newRooms[index] = { ...room, bathroomPhoto: file };
                      setData((d) => ({ ...d, rooms: newRooms }));
                    }}
                    className="w-full"
                  />
                  {room.bathroomPhoto && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(room.bathroomPhoto)}
                        alt="Bathroom preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Es para una sola persona o compartida?</label>
                  <ChoiceGrid
                    value={room.bedroomType}
                    onChange={(v) => {
                      const newRooms = [...data.rooms];
                      newRooms[index] = { ...room, bedroomType: v };
                      setData((d) => ({ ...d, rooms: newRooms }));
                    }}
                    options={[
                      { value: "Una sola persona", label: "Una sola persona" },
                      { value: "Compartida", label: "Compartida" },
                    ]}
                  />
                </div>
              </div>
            ),
          });
        });
      }
    }

    // Add bedroom details registration step for Casa/Departamento (before description)
    if ((data.propertyType === "Casa" || data.propertyType === "Departamento") && data.numRooms > 0) {
      // Ask if they want to register bedroom details
      if (data.registerBedroomDetails === null) {
        base.push({
          key: "registerBedroomDetails",
          title: "¿Quieres registrar información específica de cada habitación?",
          canContinue: data.registerBedroomDetails !== null,
          render: () => (
            <div className="space-y-4">
              <YesNo
                value={data.registerBedroomDetails}
                onChange={(v) => {
                  if (v === true) {
                    // Initialize bedrooms array
                    const bedrooms = Array.from({ length: data.numRooms }, () => ({
                      hasFurniture: null,
                      furniture: [],
                      roomPhoto: null,
                      bathroomPhoto: null,
                      bathroomType: "",
                      bedroomType: "",
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
      } else if (data.registerBedroomDetails === true && data.bedrooms.length > 0) {
        // Register details for each bedroom - add all bedroom steps
        data.bedrooms.forEach((bedroom, index) => {
          base.push({
            key: `bedroom-${index}`,
            title: `Habitación ${index + 1} de ${data.bedrooms.length}`,
            canContinue: bedroom.hasFurniture !== null && bedroom.bathroomType !== "" && bedroom.bedroomType !== "",
            render: () => (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Foto de la habitación (opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = { ...bedroom, roomPhoto: file };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                    className="w-full"
                  />
                  {bedroom.roomPhoto && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(bedroom.roomPhoto)}
                        alt="Room preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Tiene muebles?</label>
                  <YesNo
                    value={bedroom.hasFurniture}
                    onChange={(v) => {
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = { ...bedroom, hasFurniture: v, furniture: v ? bedroom.furniture : [] };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                  />
                </div>

                {bedroom.hasFurniture === true && (
                  <div>
                    <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Qué muebles tiene?</label>
                    <CheckboxList
                      options={FURNITURE_OPTIONS}
                      values={bedroom.furniture || []}
                      onToggle={(opt) => {
                        const newBedrooms = [...data.bedrooms];
                        const currentFurniture = bedroom.furniture || [];
                        const newFurniture = currentFurniture.includes(opt)
                          ? currentFurniture.filter((f) => f !== opt)
                          : [...currentFurniture, opt];
                        newBedrooms[index] = { ...bedroom, furniture: newFurniture };
                        setData((d) => ({ ...d, bedrooms: newBedrooms }));
                      }}
                    />
                  </div>
                )}
                
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
                      { value: "Propio", label: "Propio" },
                      { value: "Compartido", label: "Compartido" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">Foto del baño (opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = { ...bedroom, bathroomPhoto: file };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                    className="w-full"
                  />
                  {bedroom.bathroomPhoto && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(bedroom.bathroomPhoto)}
                        alt="Bathroom preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#0a2a5c] mb-3">¿Es para una sola persona o compartida?</label>
                  <ChoiceGrid
                    value={bedroom.bedroomType}
                    onChange={(v) => {
                      const newBedrooms = [...data.bedrooms];
                      newBedrooms[index] = { ...bedroom, bedroomType: v };
                      setData((d) => ({ ...d, bedrooms: newBedrooms }));
                    }}
                    options={[
                      { value: "Una sola persona", label: "Una sola persona" },
                      { value: "Compartida", label: "Compartida" },
                    ]}
                  />
                </div>
              </div>
            ),
          });
        });
      }
    }

    base.push({
      key: "description",
      title: "Descripción corta",
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

    return base;
  }, [
    data.propertyType,
    data.dentroDe,
    data.numRoomsToRent,
    data.registerRoomDetails,
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
    data.amenidadesCasaClub,
    data.amenidadesCasaOtro,
    data.amenidadesCasaClubOtro,
    data.espaciosComunes,
    data.espaciosComunesOtro,
    data.securityType,
    data.photos,
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
    if (data.amenities.includes("Casa Club")) {
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
            <button
              type="button"
              onClick={() => {
                setStep((s) => Math.max(0, s - 1));
              }}
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:border-gray-300"
            >
              ← Anterior
            </button>

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
