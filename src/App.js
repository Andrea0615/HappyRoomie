import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FeaturedProperties from './components/FeaturedProperties';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import PropertyDetail from './components/PropertyDetail';
import PropertyComparator from './components/PropertyComparator'; // Importar el comparador
import UserDashboard from './components/UserDashboard'; // Importar el dashboard
import PropertyOwnerRegistration from './components/PropertyOwnerRegistration'; // Importar el registro de propietarios

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchFilters, setSearchFilters] = useState(null); // Estado para guardar los filtros
  const [propertiesToCompare, setPropertiesToCompare] = useState([]); // Estado para propiedades a comparar
  const [registrationType, setRegistrationType] = useState(null); // Estado para el tipo de registro
  const [fromRegistration, setFromRegistration] = useState(false); // Nuevo estado para saber si viene de registro

  const handleNavigate = (page, data = null, filters = null, registrationType = null, fromReg = false) => {
    setCurrentPage(page);
    if (page === 'propertyDetail') {
      setSelectedProperty(data);
    } else {
      setSelectedProperty(null);
    }
    if (page === 'comparePage') {
      setPropertiesToCompare(data);
    } else {
      setPropertiesToCompare([]); // Limpiar al salir de la página de comparación
    }
    if (filters) {
      setSearchFilters(filters); // Guardar los filtros cuando se navega desde SearchPage
    }
    if (registrationType) {
      setRegistrationType(registrationType);
    }
    setFromRegistration(!!fromReg); // Guardar si viene de registro
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <SearchBar />
            <FeaturedProperties />
            <HowItWorks />
            <Testimonials />
            <CallToAction onNavigate={handleNavigate} />
          </>
        ) : currentPage === 'search' ? (
          <SearchPage onNavigate={handleNavigate} initialFilters={searchFilters} />
        ) : currentPage === 'propertyDetail' && selectedProperty ? (
          <PropertyDetail property={selectedProperty} onBack={() => handleNavigate('search', null, searchFilters)} />
        ) : currentPage === 'comparePage' && propertiesToCompare.length > 0 ? (
          <PropertyComparator propertiesToCompare={propertiesToCompare} onBack={() => handleNavigate('search', null, searchFilters)} />
        ) : currentPage === 'dashboard' ? (
          <UserDashboard onBack={() => handleNavigate('home')} fromRegistration={fromRegistration} />
        ) : currentPage === 'propertyOwnerRegistration' ? (
          <PropertyOwnerRegistration onBack={() => handleNavigate('home')} />
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;