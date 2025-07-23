import React, { useState } from 'react';
import ImageChoice from './ImageChoice';
import SliderWithInput from './SliderWithInput';
import MultiSelect from './MultiSelect';
import ComboBox from './ComboBox';
import RoomBlock from './RoomBlock';

// Imágenes de ejemplo (puedes reemplazar por tus propias rutas)
const images = {
  casa: '/img/casa.png',
  departamento: '/img/departamento.png',
  loft: '/img/loft.png',
  cuarto: '/img/cuarto.png',
};

const serviciosOptions = [
  { value: 'todos', label: 'Todos los servicios' },
  { value: 'luz', label: 'Luz' },
  { value: 'agua', label: 'Agua' },
  { value: 'gas', label: 'Gas' },
  { value: 'internet', label: 'Internet' },
  { value: 'limpieza', label: 'Limpieza' },
  { value: 'mantenimiento', label: 'Mantenimiento' },
  { value: 'agua_potable', label: 'Agua potable' },
];
const espaciosComunesOptions = [
  { value: 'sala', label: 'Sala' },
  { value: 'comedor', label: 'Comedor' },
  { value: 'lavado', label: 'Área de lavado' },
  { value: 'cocina', label: 'Cocina' },
  { value: 'terraza', label: 'Terraza' },
  { value: 'rooftop', label: 'Rooftop' },
  { value: 'bano_visitas', label: 'Baño de visitas' },
  { value: 'otro', label: 'Otro' },
];
const amenidadesOptions = [
  { value: 'gym', label: 'Gym' },
  { value: 'casa_club', label: 'Casa club' },
  { value: 'alberca', label: 'Alberca' },
  { value: 'jardin', label: 'Jardín' },
  { value: 'asadores', label: 'Asadores' },
  { value: 'pista', label: 'Pista para correr' },
  { value: 'deportes', label: 'Actividades deportivas' },
  { value: 'lavadora', label: 'Lavadora' },
  { value: 'secadora', label: 'Secadora' },
  { value: 'hamaca', label: 'Hamaca' },
];

const PropertyQuestionnaire = ({ onComplete, onBackToProfile }) => {
  // Estado principal
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    habitaciones: 1,
    habitacionesInfo: [{ amueblada: null, muebles: [], bano: '', fotos: [] }],
    habitacionesCuarto: 1,
    habitacionesCuartoInfo: [{ amueblada: null, muebles: [], bano: '', fotos: [] }],
    servicios: [],
    espaciosComunes: [],
    amenidades: [],
    ubicacion: null,
    tiempoCaminando: 5,
    tiempoCaminandoInput: 5,
    tiempoCarro: 5,
    tiempoCarroInput: 5,
    precio: 5000,
    precioInput: 5000,
    estacionamiento: false,
    vagones: 1,
    soloCuarto: false,
    genero: '',
    incluyeServicios: null,
    amueblada: null,
    petFriendly: null,
    seguridad: null,
    contrato: '',
    contratoMeses: 12,
    requisitos: '',
    requisitosPropiedad: [],
    deposito: '',
    depositoMeses: 1,
    direccion: '',
    espaciosComunesOtro: '',
  });

  // Lógica de ramificación
  const isSoloCuarto = answers.queBuscasRentar === 'habitacionCasa' || answers.queBuscasRentar === 'habitacionDepto';

  // Pasos principales
  const steps = [
    // 0
    {
      question: 'Tipo de Vivienda',
      render: () => (
        <ImageChoice
          options={[
            { value: 'casa', label: 'Casa', image: images.casa },
            { value: 'departamento', label: 'Departamento', image: images.departamento },
            { value: 'loft', label: 'Loft', image: images.loft },
          ]}
          value={answers.tipoVivienda}
          onChange={(val) => setAnswers((a) => ({ ...a, tipoVivienda: val }))}
        />
      ),
      canContinue: !!answers.tipoVivienda,
    },
    // 1
    {
      question: '¿Qué buscas rentar?',
      render: () => (
        <ImageChoice
          options={[
            { value: 'casaCompleta', label: 'Casa completa', image: images.casa },
            { value: 'departamentoCompleto', label: 'Departamento completo', image: images.departamento },
            { value: 'habitacionCasa', label: 'Habitación dentro de una casa', image: images.cuarto },
            { value: 'habitacionDepto', label: 'Habitación dentro de un departamento', image: images.cuarto },
            { value: 'loft', label: 'Loft', image: images.loft },
          ]}
          value={answers.queBuscasRentar}
          onChange={(val) => setAnswers((a) => ({ ...a, queBuscasRentar: val }))}
        />
      ),
      canContinue: !!answers.queBuscasRentar,
    },
    // 2 y siguientes
    ...(
      isSoloCuarto
        ? [
            {
              question: '¿Cuántas habitaciones rentará?',
              render: () => (
                <ComboBox
                  label="Número de habitaciones"
                  min={1}
                  max={5}
                  value={answers.habitacionesCuarto}
                  onChange={(val) => {
                    setAnswers((a) => ({
                      ...a,
                      habitacionesCuarto: val,
                      habitacionesCuartoInfo: Array.from({ length: val }, (_, i) => a.habitacionesCuartoInfo[i] || { amueblada: null, muebles: [], bano: '', fotos: [] }),
                    }));
                  }}
                  unit=""
                />
              ),
              canContinue: !!answers.habitacionesCuarto,
            },
            // Bloque de habitaciones solo cuarto
            ...Array.from({ length: answers.habitacionesCuarto }, (_, i) => ({
              question: `Habitación ${i + 1}`,
              render: () => (
                <RoomBlock
                  index={i}
                  data={answers.habitacionesCuartoInfo[i] || {}}
                  onChange={(val) => {
                    setAnswers((a) => {
                      const newArr = [...a.habitacionesCuartoInfo];
                      newArr[i] = val;
                      return { ...a, habitacionesCuartoInfo: newArr };
                    });
                  }}
                />
              ),
              canContinue: true,
            })),
            {
              question: 'Género al que buscas rentar',
              render: () => (
                <ImageChoice
                  options={[
                    { value: 'hombres', label: 'Solo hombres', image: '/img/hombre.png' },
                    { value: 'mujeres', label: 'Solo mujeres', image: '/img/mujer.png' },
                    { value: 'mixto', label: 'Mixto', image: '/img/mixto.png' },
                  ]}
                  value={answers.genero}
                  onChange={(val) => setAnswers((a) => ({ ...a, genero: val }))}
                />
              ),
              canContinue: !!answers.genero,
            },
            {
              question: 'Precio mensual',
              render: () => (
                <SliderWithInput
                  min={1000}
                  max={50000}
                  step={500}
                  value={answers.precioInput}
                  onChange={(val) => setAnswers((a) => ({ ...a, precioInput: val, precio: val }))}
                  label="Precio mensual (puedes escribir o mover el slider)"
                  currency
                />
              ),
              canContinue: !!answers.precioInput,
            },
            {
              question: '¿Incluye servicios?',
              render: () => (
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-lg border-2 font-medium ${answers.incluyeServicios === true ? 'border-[#ffd662] bg-yellow-50' : 'border-gray-200 bg-white'}`}
                    onClick={() => setAnswers((a) => ({ ...a, incluyeServicios: true }))}
                  >Sí</button>
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-lg border-2 font-medium ${answers.incluyeServicios === false ? 'border-[#ffd662] bg-yellow-50' : 'border-gray-200 bg-white'}`}
                    onClick={() => setAnswers((a) => ({ ...a, incluyeServicios: false }))}
                  >No</button>
                </div>
              ),
              canContinue: answers.incluyeServicios !== null,
            },
            ...(answers.incluyeServicios
              ? [
                  {
                    question: 'Selecciona los servicios que incluye',
                    render: () => (
                      <MultiSelect
                        options={serviciosOptions}
                        value={answers.servicios}
                        onChange={(val) => setAnswers((a) => ({ ...a, servicios: val }))}
                      />
                    ),
                    canContinue: answers.servicios.length > 0,
                  },
                ]
              : []),
            // Fotos de la habitación ya están en el bloque
            {
              question: 'Agrega la dirección de tu propiedad',
              render: () => (
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Dirección..."
                  value={answers.direccion}
                  onChange={(e) => setAnswers((a) => ({ ...a, direccion: e.target.value }))}
                />
              ),
              canContinue: !!answers.direccion,
            },
            {
              question: '¿Cuánto tiempo se hace caminando?',
              render: () => (
                <SliderWithInput
                  min={1}
                  max={180}
                  step={1}
                  value={answers.tiempoCaminandoInput}
                  onChange={(val) => setAnswers((a) => ({ ...a, tiempoCaminandoInput: val, tiempoCaminando: val }))}
                  label="Tiempo caminando (minutos)"
                  unit="min"
                />
              ),
              canContinue: !!answers.tiempoCaminandoInput,
            },
            {
              question: '¿Cuánto tiempo se hace en carro?',
              render: () => (
                <SliderWithInput
                  min={1}
                  max={180}
                  step={1}
                  value={answers.tiempoCarroInput}
                  onChange={(val) => setAnswers((a) => ({ ...a, tiempoCarroInput: val, tiempoCarro: val }))}
                  label="Tiempo en carro (minutos)"
                  unit="min"
                />
              ),
              canContinue: !!answers.tiempoCarroInput,
            },
          ]
        : [
            // ... aquí va la rama general (la que ya tienes para no solo cuarto) ...
            // Puedes copiar y pegar la lógica de la rama general aquí
          ])
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      <div className="w-full bg-[#ffd662] py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-black font-['Poppins']">Registra tu propiedad</h1>
        </div>
      </div>
      <main className="flex-grow max-w-4xl mx-auto py-8 px-4 flex flex-col justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-black mb-8 text-center font-['Poppins']">
            {currentStep.question}
          </h2>
          {currentStep.render()}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`px-6 py-3 rounded-lg font-medium transition-colors font-['Poppins'] ${'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              ← Anterior
            </button>
            <button
              onClick={() => {
                if (isLastStep) onComplete(answers);
                else setStep((s) => s + 1);
              }}
              disabled={!currentStep.canContinue}
              className={`px-6 py-3 rounded-lg font-medium transition-colors font-['Poppins'] ${
                currentStep.canContinue
                  ? 'bg-[#ffd662] text-black hover:bg-[#e6c52b]'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLastStep ? 'Finalizar' : 'Siguiente →'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyQuestionnaire; 