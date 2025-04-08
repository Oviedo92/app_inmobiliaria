// src/components/Navbar.jsx
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const AppNavbar = () => {
  return (
    <Navbar expand="lg" bg="success" data-bs-theme="dark" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold">
        🏠 LamaState
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto gap-2">
            <Nav.Link as={Link} to="/home" className="text-light">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/Agents" className="text-light">Agentes</Nav.Link>
            <Nav.Link as={Link} to="/properties" className="text-light">Propiedades</Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-light">Iniciar Sesión</Nav.Link>
            <Nav.Link as={Link} to="/register" className="text-light">Registrarse</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
