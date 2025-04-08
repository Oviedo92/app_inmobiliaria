import { Row, Col } from 'react-bootstrap';
import helpdeskImage from '../assets/helpdesk_vector.png'; // ajusta la ruta si estás en otro subdirectorio

const ContactLinks = () => {
    return (
        <Row className="py-4">
            <Col md={6}>
                <h5 className="fw-bold mb-3 text-uppercase">¿Necesitas ayuda?</h5>
                <ul className="list-unstyled">
                    <li className="mb-2">
                        <i className="fas fa-headset me-2 "></i>
                        <a href="#" className="text-light text-decoration-none">Trabaja con nosotros</a>
                    </li>
                    <li className="mb-2">
                        <i className="fas fa-question-circle me-2 warnnig-text"></i>
                        <a href="#" className="text-light text-decoration-none">Preguntas frecuentes</a>
                    </li>
                    <li className="mb-2">
                        <i className="fas fa-comments me-2"></i>
                        <a href="#" className="text-light text-decoration-none">Quejas y reclamos</a>
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
