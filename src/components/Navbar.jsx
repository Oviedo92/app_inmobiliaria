// src/components/Navbar.jsx
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // 👈 Revisamos si hay sesión activa

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="success" data-bs-theme="dark" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold">
          🏠 LamaEstate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto gap">

            <Nav.Link as={Link} to="/home" className="text-light">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/agents" className="text-light">Agentes</Nav.Link>
            <Nav.Link as={Link} to="/properties" className="text-light">Propiedades</Nav.Link>
            <Nav.Link as={Link} to="/services" className="text-light">Servicios</Nav.Link>
            <Nav.Link as={Link} to="/jobs" className="text-light">¿Necesitas trabajo?</Nav.Link>

            {!token ? (
              <>
                <Nav.Link as={Link} to="/login" className="text-light">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-light">Registrarse</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile" className="text-light">Mi Perfil</Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-light">Cerrar Sesión</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
