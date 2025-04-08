// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './routes/home';
import Register from './routes/Register';

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Activamos el spinner cuando la ruta cambia
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // tiempo simulado de carga

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {loading && <LoadingScreen />}
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
