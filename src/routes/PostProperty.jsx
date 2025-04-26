import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PostProperty = () => {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    ubicacion: "",
    tipo: "",
    nombre: "",
    contacto: "",
    whatsapp: "",
    fotoPerfil: "",
    imagenes: [],
    documento: "",
    userId: localStorage.getItem("userId") || "", // asociar post al usuario autenticado
    username: localStorage.getItem("username") || "", // Agregamos el username directamente
    cuenta: "", // Nuevo campo: Usuario o Empresarial
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFotoPerfil = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, fotoPerfil: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagenes = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setForm((prevForm) => ({
        ...prevForm,
        imagenes: [...prevForm.imagenes, ...images],
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = { ...form, id: uuidv4() };

    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    localStorage.setItem("properties", JSON.stringify([...stored, newProperty]));

    navigate("/properties");
  };

  return (
    <Container className="mt-5">
      <h2>Publicar Nueva Propiedad</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Row>
          <Col md={6}>
            {/* Campos de texto */}
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control name="titulo" value={form.titulo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control name="precio" type="number" value={form.precio} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Select name="ubicacion" value={form.ubicacion} onChange={handleChange} required>
                <option value="">Seleccione</option>
                <option value="Bogota">Bogotá</option>
                <option value="Medellin">Medellín</option>
                <option value="Cali">Cali</option>
                <option value="Valledupar">Valledupar</option>
                <option value="CDMX">CDMX</option>
                <option value="Guadalajara">Guadalajara</option>
                <option value="Monterrey">Monterrey</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Propiedad</Form.Label>
              <Form.Select name="tipo" value={form.tipo} onChange={handleChange} required>
                <option value="">Seleccione</option>
                <option value="Casa">Arrendar</option>
                <option value="Apartamento">Vender</option>
                <option value="Terreno">Proyecto</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Información del anunciante */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Anunciante</Form.Label>
              <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contacto (email o teléfono)</Form.Label>
              <Form.Control name="contacto" value={form.contacto} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de WhatsApp</Form.Label>
              <Form.Control
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="Ej: +57 3001234567"
              />
            </Form.Group>

            {/* Foto de perfil */}
            <Form.Group className="mb-3">
              <Form.Label>Foto de Perfil</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFotoPerfil} />
            </Form.Group>
            {form.fotoPerfil && <img src={form.fotoPerfil} alt="Perfil" className="img-thumbnail mb-3" style={{ width: "100px" }} />}

            {/* Imágenes del inmueble */}
            <Form.Group className="mb-3">
              <Form.Label>Imágenes del Inmueble</Form.Label>
              <Form.Control type="file" accept="image/*" multiple onChange={handleImagenes} />
            </Form.Group>
            <Row>
              {form.imagenes.map((img, i) => (
                <Col xs={4} key={i}>
                  <img src={img} alt={`img-${i}`} className="img-fluid rounded mb-2" />
                </Col>
              ))}
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Documento PDF (opcional)</Form.Label>
              <Form.Control type="file" accept=".pdf" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setForm({ ...form, documento: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }} />
            </Form.Group>





          </Col>


        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Tipo de Cuenta</Form.Label>
          <Form.Select
            name="cuenta"
            value={form.cuenta}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione su tipo de cuenta</option>
            <option value="Usuario">Usuario</option>
            <option value="Empresa">Empresa</option>
          </Form.Select>
        </Form.Group>


        {/* Información adicional antes del submit */}
        <div className="mt-3 p-2 bg-light rounded border">
          <p><strong>👤 Publicado por:</strong> {form.username}</p>
        </div>


        <Button variant="success" type="submit" className="mt-3">Publicar Propiedad</Button>
      </Form>
    </Container>
  );
};

export default PostProperty;
