import { Container, Row, Col, Card } from 'react-bootstrap';
import agent1 from '../assets/perfil1.jpg';
import agent2 from '../assets/perfil2.jpg';
import agent3 from '../assets/pefil3.jpg';

const agents = [
  {
    name: 'Oviedo Emmanuel',
    role: 'Jefe ejecutivo',
    email: 'eleonardooviedo@unicesar.edu.co',
    image: agent1,
  },
  {
    name: 'Gonzalez Roberto',
    role: 'Manager de servicio',
    email: 'rcgonzalez@unicesar.edu.co',
    image: agent2,
  },
  {
    name: 'Martinez Marlon',
    role: 'Manager de trabajo',
    email: 'marlonamartinez@unicesar.edu.co',
    image: agent3,
  }
];

const Agents = () => {
  return (
    <section id="agents" className="py-5 bg-light">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-uppercase">Nuestro equipo</h2>
        <Row className="gy-4">
          {agents.map((agent, index) => (
            <Col key={index} lg={4} md={6}>
              <Card className="h-100 shadow-lg border-0">
                <Card.Img
                  variant="top"
                  src={agent.image}
                  alt={`Foto de ${agent.name}`}
                  className="img-fluid"
                  style={{ height: '320px', objectFit: 'cover' }}
                />
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold fs-4">{agent.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted fs-6">{agent.role}</Card.Subtitle>
                  <Card.Text className="text-dark small">
                    <strong>Contacto:</strong> <br />
                    <a href={`mailto:${agent.email}`} className="text-decoration-none text-primary">
                      {agent.email}
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Agents;
