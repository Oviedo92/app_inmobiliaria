// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './routes/home';
import Register from './routes/Register';
import Login from './routes/login';
import Profile from './routes/Profile';
import Properties from './routes/Properties';
import Agents from './routes/Agents';
import PostProperty from './routes/PostProperty';
import PropertyDetails from './routes/PropertyDetails';
import JobUsers from './routes/JobUsers';
import Services from './routes/Services';
import Complaints from './routes/Complaints';
import Admin from './routes/Admin'; 







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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/contact" element={<h1>Contacto</h1>} />
        <Route path="/about" element={<h1>Sobre nosotros</h1>} />
        <Route path="/jobs-with-us" element={<h1>Trabaja con nosotros</h1>} />
        <Route path="/questions-and-answer" element={<h1>Preguntas frecuentes</h1>} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/post-property" element={<PostProperty />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/services" element={<Services />} />  
        <Route path="/jobs" element={<JobUsers />} /> 
        <Route path="/admin" element={<Admin />} />

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
