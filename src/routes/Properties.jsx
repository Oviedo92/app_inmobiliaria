import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useState } from "react";

const Properties = () => {
  const allProperties = JSON.parse(localStorage.getItem("properties")) || [];

  const [filters, setFilters] = useState({
    ubicacion: "",
    tipo: "",
    precioMin: "",
    precioMax: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredProperties = allProperties.filter((property) => {
    const matchesUbicacion = filters.ubicacion
      ? property.ubicacion.toLowerCase().includes(filters.ubicacion.toLowerCase())
      : true;

    const matchesTipo = filters.tipo
      ? property.tipo.toLowerCase() === filters.tipo.toLowerCase()
      : true;

    const precio = parseFloat(property.precio);
    const precioMin = filters.precioMin ? parseFloat(filters.precioMin) : 0;
    const precioMax = filters.precioMax ? parseFloat(filters.precioMax) : Infinity;
    const matchesPrecio = precio >= precioMin && precio <= precioMax;

    return matchesUbicacion && matchesTipo && matchesPrecio;
  });

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Propiedades Publicadas</h2>

      {/* Filtros */}
      <Form className="mb-4">
        <Row className="g-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Ubicación</Form.Label>
              <Form.Select name="ubicacion" value={filters.ubicacion} onChange={handleChange}>
                <option value="">Todas</option>
                <option value="Bogota">Bogotá</option>
                <option value="Medellin">Medellín</option>
                <option value="Cali">Cali</option>
                <option value="Valledupar">Valledupar</option>
                <option value="CDMX">CDMX</option>
                <option value="Guadalajara">Guadalajara</option>
                <option value="Monterrey">Monterrey</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Tipo de Propiedad</Form.Label>
              <Form.Select name="tipo" value={filters.tipo} onChange={handleChange}>
                <option value="">Todos</option>
                <option value="proyecto">Proyecto</option>
                <option value="arrendar">Arrendar</option>
                <option value="vender">Vender</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Precio (USD)</Form.Label>
              <Form.Control
                type="number"
                name="precioMin"
                placeholder="Ej. 100000"
                value={filters.precioMin}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row className="g-4 justify-content-center">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Col key={property.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <Card.Img
                  variant="top"
                  src={property.imagenes[0]}
                  alt={property.titulo}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-5 fw-bold text-primary mb-2">{property.titulo}</Card.Title>

                  <Card.Text className="text-muted mb-3" style={{ fontSize: "1rem" }}>
                    {property.descripcion.length > 100 ? property.descripcion.slice(0, 100) + "..." : property.descripcion}
                  </Card.Text>

                  <Card.Text><strong>Precio:</strong> ${property.precio}</Card.Text>
                  <Card.Text><strong>Ubicación:</strong> {property.ubicacion}</Card.Text>
                  <Card.Text><strong>Tipo:</strong> {property.tipo}</Card.Text>
                  <Card.Text><strong>Username:</strong> {property.username}</Card.Text>
                  <Card.Text><strong>Tipo de Cuenta:</strong> {property.cuenta}</Card.Text>

                  <Link to={`/property/${property.id}`} className="btn btn-primary mt-3">
                    Ver detalles
                  </Link>
                </Card.Body>

              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No hay propiedades que coincidan con los filtros.</p>
        )}
      </Row>
    </Container>
  );
};

export default Properties;
