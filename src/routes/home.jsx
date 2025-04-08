// src/routes/Home.jsx
import { Container, Row, Col, Button } from 'react-bootstrap';
import BannerCarousel from '../components/BannerCarousel';

const Home = () => {
  return (
    <>
      {/* Banner arriba de todo */}
      <BannerCarousel />

      {/* Contenido principal */}
      <Container className="py-5 text-center">
        <h1 className="display-4 mb-4 text-success fw-bold">Bienvenido a LamaState 🏡</h1>
        <p className="lead mb-5">
          <strong>Compra</strong>, <strong>Vende</strong> y <strong>Arrienda</strong>
          <br />
          inmueble fácilmente. Únete a nuestra comunidad de confianza.
        </p>

        <Row className="justify-content-center">
          <Col md={4}>
            <div className="p-4 border rounded shadow-sm bg-light">
              <h4>¿Quieres comprar?</h4>
              <p>Explora propiedades que se ajustan a tu necesidad y presupuesto.</p>
              <Button variant="success" href="/properties">Ver propiedades</Button>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-4 border rounded shadow-sm bg-light mt-4 mt-md-0">
              <h4>¿Deseas publicar?</h4>
              <p>Publica tu inmueble y llega a miles de usuarios interesados.</p>
              <Button variant="outline-success" href="/register">Comenzar ahora</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
