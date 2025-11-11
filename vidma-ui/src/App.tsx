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
import VideoSection from './pages/Console/VideoSection';
import GallerySection from './pages/Console/GallerySection';
import AwardsSection from './pages/Console/AwardsSection';
import TeamsSection from './pages/Console/TeamsSection';
import StatsSection from './pages/Console/StatsSection';
import FeedbacksSection from './pages/Console/FeedbacksSection';
import MarketPlace from './pages/MarketPlace';
import MarketPlaceSection from './pages/Console/MarketPlaceSection';
import OrdersSection from './pages/Console/OrdersSection';
import UserMaintenance from './pages/Console/UserMaintenance';

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
            <Route path="/vidma/console/video-section" element={<VideoSection />} />
            <Route path="/vidma/console/gallery-section" element={<GallerySection />} />
            <Route path="/vidma/console/awards-section" element={<AwardsSection />} />
            <Route path="/vidma/console/teams-section" element={<TeamsSection />} />
            <Route path="/vidma/console/stats-section" element={<StatsSection />} />
            <Route path="/vidma/console/feedbacks-section" element={<FeedbacksSection />} />
            <Route path="/vidma/console/marketplace-section" element={<MarketPlaceSection />} />
            <Route path="/vidma/console/orders-section" element={<OrdersSection />} />
          </Routes>
        </Navbar>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/console/login" element={<Login />} />
          <Route path="/user-maintenance/p/HADFH4UPa70+xg6C1KGQ==" element={<UserMaintenance />} />
        </Routes>
      )}
    </>

  )
}

export default App
