import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Console/Login';
import Landing from './pages/Console/Landing';
import Toast from './components/Toast';

const App: React.FC = () => {

  return (
    <>
      <Toast />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/console/login" element={<Login />} />
          <Route path="/console/landing" element={<Landing />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
