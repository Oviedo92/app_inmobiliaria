import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import helpdeskImage from '../assets/helpdesk_vector.png'; // asegúrate que la ruta sea correcta

const ContactLinks = () => {
  return (
    <Row className="py-4">
      <Col md={6}>
        <h5 className="fw-bold mb-3 text-uppercase">¿Necesitas ayuda?</h5>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/preguntas-frecuentes" className="text-decoration-none text-light">
              <i className="fas fa-question-circle me-2"></i>Preguntas frecuentes
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/complaints" className="text-decoration-none text-light">
              <i className="fas fa-comments me-2"></i>Quejas y reclamos
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/about" className="text-decoration-none text-light">
              <i className="fas fa-comments me-2"></i>Sobre nosotros
            </Link>
          </li>
        </ul>
      </Col>

      <Col md={6} className="d-flex align-items-center justify-content-center">
        <img
          src={helpdeskImage}
          alt="Centro de ayuda"
          className="img-fluid rounded shadow-sm"
          style={{ maxHeight: '248px' }}
        />
      </Col>
    </Row>
  );
};

export default ContactLinks;
