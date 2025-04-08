// src/components/LoadingScreen.jsx
import { Spinner } from 'react-bootstrap';
import logo from '../assets/loading_logo.png'; // ✅ Asegúrate de que el archivo existe

const LoadingScreen = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex flex-column justify-content-center align-items-center z-3">
      <img
        src={logo}
        alt="LamaEstate Logo"s
        className="mb-4"
      />
      <Spinner animation="border" variant="success" role="status" />
      <p className="mt-3 text-success fw-semibold fs-5">
        Cargando LamaEstate...
      </p>
    </div>
  );
};

export default LoadingScreen;
