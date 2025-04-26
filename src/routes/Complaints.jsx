import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const ComplaintsForm = () => {
  const [userType, setUserType] = useState(""); // persona o empresa
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({});

  const handleTypeChange = (e) => {
    setUserType(e.target.value);
    setFormData({}); // limpia los datos al cambiar tipo
    setSuccess(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const url =
      userType === "persona"
        ? "https://localhost:7081/api/ReporteUsuario"
        : "https://localhost:7081/api/ReporteEmpresa";

    try {
      console.log("Enviando datos a:", url);
      console.log("Datos:", formData);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      console.log("Respuesta del servidor:", result);

      if (response.ok) {
        setSuccess(true);
        setFormData({});
        setUserType("");
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setSuccess(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <h3 className="text-center mb-4">Formulario de Quejas</h3>

          <Form.Group className="mb-4">
            <Form.Label>¿A quien va dirigida su solicitud?</Form.Label>
            <Form.Select value={userType} onChange={handleTypeChange}>
              <option value="">Selecciona una opción</option>
              <option value="persona">Persona</option>
              <option value="empresa">Empresa</option>
            </Form.Select>
          </Form.Group>

          <Form onSubmit={handleSubmit}>
            {userType === "persona" && (
              <>
                <h5 className="mt-4 text-primary">Datos del Usuario</h5>

              

                <Form.Group className="mb-3">
                  <Form.Label>Temática</Form.Label>
                  <Form.Select name="Tematica" onChange={handleInputChange}>
                    <option value="">Seleccione</option>
                    <option value="Comportamiento inapropiado">Comportamiento inapropiado</option>
                    <option value="Mal manejo de comunicación">Mal manejo de comunicación</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombres y Apellidos</Form.Label>
                  <Form.Control
                    name="Nombres_apellidos_u"
                    placeholder="Tu nombre completo"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    name="Celular_u"
                    placeholder="Ej: +57 3001234567"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    name="Correo_u"
                    placeholder="correo@ejemplo.com"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Select name="Nomb_ciudad_u" onChange={handleInputChange}>
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
                  <Form.Label>Descripción de la queja</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="Descripcion_queja_u"
                    placeholder="Cuéntanos con detalle lo ocurrido..."
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Código de Usuario</Form.Label>
                  <Form.Control
                    name="Cod_ref_usuario_u"
                    placeholder="Ej: usuario56480"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Check
              type="checkbox"
              label="Autorizo a LamaEstate para ponerse en contacto a través de los canales seleccionados para gestión de cobranza"
              required
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              label="Autorizo a LamaEstate para ponerse en contacto con fines informativos, publicitarios o comerciales"
              required
              className="mb-3"
            />

              </>
            )}

            {userType === "empresa" && (
              <>
                <h5 className="mt-4 text-primary">Datos de la Empresa</h5>

               

                <Form.Group className="mb-3">
                  <Form.Label>Temática</Form.Label>
                  <Form.Select name="Tematica" onChange={handleInputChange}>
                    <option value="">Seleccione</option>
                    <option value="Comportamiento inapropiado">Comportamiento inapropiado</option>
                    <option value="Mal manejo de comunicación">Mal manejo de comunicación</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre de contacto</Form.Label>
                  <Form.Control
                    name="Nombres_apellidos"
                    placeholder="Nombre del representante"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    name="Celular"
                    placeholder="Ej: +52 5522334455"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    name="Correo"
                    placeholder="empresa@correo.com"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Select name="Nomb_ciudad" onChange={handleInputChange}>
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
                  <Form.Label>Descripción de la queja</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="Descripcion_queja"
                    placeholder="Describe lo que ocurrió con detalle..."
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>ID Empresa</Form.Label>
                  <Form.Control
                    name="id_empresa"
                    placeholder="Ej: EMP-0456"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Check
              type="checkbox"
              label="Autorizo a LamaEstate para ponerse en contacto a través de los canales seleccionados para gestión de cobranza"
              required
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              label="Autorizo a LamaEstate para ponerse en contacto con fines informativos, publicitarios o comerciales"
              required
              className="mb-3"
            />



              </>
            )}

           
            <div className="text-muted small mb-4">
              Su solicitud será procesada y LamaEstate se pondrá en contacto con usted una vez sea tramitada.
            </div>

            <Button type="submit" variant="primary" className="w-100">
              Enviar Queja
            </Button>
          </Form>


          {success === true && (
            <Alert variant="success" className="mt-4">
              Queja enviada correctamente.
            </Alert>
          )}
          {success === false && (
            <Alert variant="danger" className="mt-4">
              Ocurrió un error. Inténtalo nuevamente.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ComplaintsForm;
