import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Carousel,
  Modal,
  Form,
} from "react-bootstrap";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [property, setProperty] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    const found = stored.find((p) => p.id === id);
    setProperty(found);

    if (!userId) {
      setShowModal(true);
    }
  }, [id, userId]);

  const handleRedirect = () => {
    setShowModal(false);
    navigate("/register");
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = { sender: "Tú", text: chatInput };
      setChatMessages((prev) => [...prev, newMessage]);
      setChatInput("");

      setTimeout(() => {
        const botReply = {
          sender: property?.nombre || "Vendedor",
          text: `Gracias por tu interés. Puedes contactarme a mi correo ${property?.contacto} para agendar una visita. ¡Estoy atento!`,
        };
        setChatMessages((prev) => [...prev, botReply]);
      }, 1000);
    }
  };

  if (!property) {
    return (
      <Container className="mt-5">
        <h4>Propiedad no encontrada</h4>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* Modal de registro si no hay userId */}
      <Modal show={showModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Registro necesario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Para adquirir este bien o inmueble, debes registrarte en nuestra
          página para continuar con el proceso.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRedirect}>
            Ir a registrarse
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col md={8}>
          <Card className="mb-4 shadow-lg">
            <Carousel>
              {property.imagenes?.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    style={{ height: "350px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <Card.Body>
              <Card className="mb-4 p-3 bg-light d-flex flex-row align-items-center">
                <img
                  src={property.fotoPerfil || "https://via.placeholder.com/60"}
                  alt="Foto de perfil"
                  className="rounded-circle me-3"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <div>
                  <h7 className="fw-bold">Nombre</h7>
                  <h6 className="mb-2">{property.nombre}</h6>

                  <h7 className="fw-bold">Correo</h7>
                  <br />
                  <small className="text-muted fw-bold">{property.contacto}</small>
                  <br />

                  <h7 className="fw-bold">Tipo de Cuenta</h7>
                  <br />
                  <small className="text-muted fw-bold">{property.cuenta || "No especificado"}</small>
                  <br />

                  <h7 className="fw-bold">Username (ID)</h7>
                  <br />
                  <small className="text-muted fw-bold">{property.username || "No disponible"}</small>
                </div>
              </Card>


              {/* INFO DE LA PROPIEDAD */}
              <Card className="p-3">
                <h4 className="mb-3">{property.titulo}</h4>
                <p>
                  <strong>Ubicación:</strong> {property.ubicacion}
                </p>
                <p>
                  <strong>Precio:</strong> ${property.precio}
                </p>
                <p>
                  <strong>Tipo:</strong> {property.tipo}
                </p>
                <p>
                  <strong>Descripción:</strong> {property.descripcion}
                </p>

                {property.documento && (
                  <>
                    <h5 className="mt-4">Documento de legalidad</h5>
                    <iframe
                      src={property.documento}
                      title="Documento"
                      style={{
                        width: "100%",
                        height: "400px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </>
                )}


              </Card>
            </Card.Body>
          </Card>
        </Col>

        {/* CHAT CON ANUNCIANTE */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center">
              <strong>Chat con el anunciante</strong>
            </Card.Header>
            <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${msg.sender === "Tú"
                    ? "bg-light text-end ms-auto"
                    : "bg-secondary text-white text-start me-auto"
                    }`}
                  style={{ maxWidth: "80%" }}
                >
                  <small>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </small>
                </div>
              ))}
            </Card.Body>
            <Card.Footer>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <Form.Group controlId="chatInput">
                  <Form.Control
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-2 w-100"
                >
                  Enviar
                </Button>
              </Form>
            </Card.Footer>
          </Card>

          {/* BOTÓN WHATSAPP */}
          {property.whatsapp && (
            <a
              href={`https://wa.me/${property.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success w-100 mt-3"
            >
              Contactar por WhatsApp
            </a>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;
