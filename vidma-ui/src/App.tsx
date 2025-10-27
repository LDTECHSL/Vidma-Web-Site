import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Console/Login';
import Toast from './components/Toast';
import Navbar from './layouts/Navbar';
import HeroSection from './pages/Console/HeroSection';
import ContactUsSection from './pages/Console/ContactUsSection';

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
