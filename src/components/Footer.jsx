import { Container, Row, Col } from 'react-bootstrap';
import ContactLinks from './ContactLinks'; // 👈 Importa el nuevo componente

const Footer = () => {
  return (
    <footer className="bg-success bg-gradient text-white pt-5 pb-3 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-4 mb-md-0">
            <h4 className="fw-bold">🏠 LamaEstate</h4>
            <p>Encuentra, publica y alquila inmuebles rápidamente.</p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-semibold">📞 Contacto</h5>
            <p><i className="fas fa-envelope me-2"></i> eleonardooviedo@unicesar.edu.co</p>
            <p><i className="fas fa-envelope me-2"></i> rcgonzalez@unicesar.edu.co</p>
            <p><i className="fas fa-envelope me-2"></i> marlonamartinez@unicesar.edu.co</p>
            <p><i className="fas fa-map-marker-alt me-2"></i> Sede principal</p>
            <p><i className="sede"></i> Valledupar, Cesar, Colombia</p>
            <p><i className="fas fa-phone me-2"></i> +57 300 123 4567</p>
          </Col>

          <Col md={4}>
            <h5 className="fw-semibold">🌐 Síguenos</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-5">
              <a href="https://facebook.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </Col>
        </Row>

        {/* 🔽 Aquí se incluye el nuevo bloque de ayuda */}
        <ContactLinks />

        <hr className="my-4 border-light" />
        <p className="text-center mb-0 small">
          &copy; 2025 <strong>LamaEstate</strong>. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
