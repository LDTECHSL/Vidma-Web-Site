import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Console/Login';
import Toast from './components/Toast';
import Navbar from './layouts/Navbar';
import HeroSection from './pages/Console/HeroSection';
import ContactUsSection from './pages/Console/ContactUsSection';
import AboutUsSection from './pages/Console/AboutUsSection';
import ServicesSection from './pages/Console/ServicesSection';
import TopProductsSection from './pages/Console/TopProductsSection';
import ShowroomsSection from './pages/Console/ShowroomsSection';

const App: React.FC = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/vidma/console');

  return (
    <>
      <Toast />
      {isAdminRoute ? (
        <Navbar>
          <Routes>
            <Route path="/vidma/console/hero-section" element={<HeroSection />} />
            <Route path="/vidma/console/contactus-section" element={<ContactUsSection />} />
            <Route path="/vidma/console/aboutus-section" element={<AboutUsSection />} />
            <Route path="/vidma/console/services-section" element={<ServicesSection />} />
            <Route path="/vidma/console/top-products-section" element={<TopProductsSection />} />
            <Route path="/vidma/console/showrooms-section" element={<ShowroomsSection />} />
          </Routes>
        </Navbar>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/console/login" element={<Login />} />
        </Routes>
      )}
    </>

  )
}

export default App
