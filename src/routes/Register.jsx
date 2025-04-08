// src/routes/Register.jsx
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Register = () => {
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-success text-center fw-bold">Registro de Usuario 📝</h2>
      <Form className="bg-light p-4 rounded shadow-sm">

          <Form.Label>Tipo de usuario</Form.Label>
          <Form.Select required>
            <option value="">Selecciona</option>
            <option value="">Empresa</option>
            <option value="comprador">Persona Natural</option>
          </Form.Select>  

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre" required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="ejemplo@correo.com" required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Crea una contraseña" required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control type="password" placeholder="Repite tu contraseña" required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Interes</Form.Label>
          <Form.Select required>
            <option value="">Selecciona</option>
            <option value="comprador">Comprar</option>
            <option value="vendedor">Vender</option>
            <option value="arrendador">Arrendar</option>
          </Form.Select>
        </Form.Group>



        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Acepto los términos y condiciones" required />
        </Form.Group>

        <div className="d-grid">
          <Button variant="success" size="lg" type="submit">
            Registrarme
          </Button>
          
        </div>
      </Form>
    </Container>
  );
};

export default Register;
