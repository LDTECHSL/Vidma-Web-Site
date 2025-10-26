import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Console/Login';
import Landing from './pages/Console/Landing';
import Toast from './components/Toast';
import Navbar from './layouts/Navbar';

const App: React.FC = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/vidma/console');

  return (
    <>
      <Toast />
      {isAdminRoute ? (
        <Navbar>
          <Routes>
            <Route path="/vidma/console/landing" element={<Landing />} />
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
