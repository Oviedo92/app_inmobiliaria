import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterForm = () => {
  const [userType, setUserType] = useState("persona");
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(null);
  const [ciudades, setCiudades] = useState([]);
  const navigate = useNavigate();

  const handlePaisChange = (e) => {
    const paisSeleccionado = e.target.value;
    let ciudadesDisponibles = [];

    if (paisSeleccionado === "Colombia") {
      ciudadesDisponibles = ["Bogota", "Medellin", "Cali", "Valledupar"];
    } else if (paisSeleccionado === "México") {
      ciudadesDisponibles = ["CDMX", "Guadalajara", "Monterrey"];
    }

    setCiudades(ciudadesDisponibles);
    setFormData((prev) => ({ ...prev, ubi_pais: paisSeleccionado }));
  };

  const handleCiudadChange = (e) => {
    const ciudadSeleccionada = e.target.value;
    setFormData((prev) => ({ ...prev, ubi_dire_ciudad: ciudadSeleccionada }));
  };

  const handleTypeChange = (e) => {
    setUserType(e.target.value);
    setFormData({});
    setSuccess(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      userType === "persona"
        ? "https://localhost:7081/api/Personas"
        : "https://localhost:7081/api/Empresa";

    const formDataToSend = { ...formData };

    if (formData.ubi_pais && formData.ubi_dire_ciudad) {
      formDataToSend.direccion = [
        {
          ubi_pais: formData.ubi_pais,
          ubi_dire_ciudad: formData.ubi_dire_ciudad,
        },
      ];

      // Eliminamos los campos planos
      delete formDataToSend.ubi_pais;
      delete formDataToSend.ubi_dire_ciudad;
    }


    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setSuccess(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <h3 className="text-center mb-4">Formulario de Registro</h3>

        <Form.Group className="mb-4">
          <Form.Label>¿Qué eres?</Form.Label>
          <Form.Select value={userType} onChange={handleTypeChange}>
            <option value="">Selecciona una opción</option>
            <option value="persona">Persona</option>
            <option value="empresa">Empresa</option>
          </Form.Select>
        </Form.Group>

        <Form onSubmit={handleSubmit}>
          {userType === "persona" && (
            <>
              <h5 className="mt-4 text-primary">Datos Personales</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cédula</Form.Label>
                    <Form.Control type="text" name="Cc_id_usuario" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Primer Nombre</Form.Label>
                    <Form.Control type="text" name="P_nombre" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Segundo Nombre</Form.Label>
                    <Form.Control type="text" name="S_nombre" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Primer Apellido</Form.Label>
                    <Form.Control type="text" name="P_apellido" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Segundo Apellido</Form.Label>
                    <Form.Control type="text" name="S_apellido" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" name="FechaN" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Género</Form.Label>
                    <Form.Select name="Sexo" onChange={handleInputChange}>
                      <option value="">Selecciona</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <h5 className="mt-4 text-primary">Datos de Contacto</h5>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" name="Email" onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="Contraseña" onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="Telefono" onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Interés</Form.Label>
                <Form.Select name="Despc_interes" onChange={handleInputChange}>
                  <option value="">Selecciona</option>
                  <option value="Vender">Vender</option>
                  <option value="Arrendar">Arrendar</option>
                  <option value="Proyectos">Proyectos</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} name="Detail_perfil_persona" onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>País</Form.Label>
                <Form.Select onChange={handlePaisChange}>
                  <option value="">Selecciona un país</option>
                  <option value="Colombia">Colombia</option>
                  <option value="México">México</option>
                </Form.Select>
              </Form.Group>

              {ciudades.length > 0 && (
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Select onChange={handleCiudadChange}>
                    <option value="">Selecciona una ciudad</option>
                    {ciudades.map((ciudad) => (
                      <option key={ciudad} value={ciudad}>{ciudad}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}

            </>
          )}

          {userType === "empresa" && (
            <>
              <h5 className="mt-4 text-primary">Datos de la Empresa</h5>
              <Form.Group className="mb-3">
                <Form.Label>NIT</Form.Label>
                <Form.Control type="text" name="NIT_empresa" onChange={handleInputChange} />
              </Form.Group>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de origen</Form.Label>
                  <Form.Control type="date" name="Fecha_origen" onChange={handleInputChange} />
                </Form.Group>
              </Col>

              <h5 className="mt-4 text-primary">Datos de Contacto</h5>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" name="Correo_empresa" onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="Contraseña_empresa" onChange={handleInputChange} />
              </Form.Group>

              <h5 className="mt-4 text-primary">Detalles de Perfil</h5>
              <Form.Group className="mb-3">
                <Form.Label>Interés</Form.Label>
                <Form.Select name="Interes_empresa" onChange={handleInputChange}>
                  <option value="">Selecciona</option>
                  <option value="Vender">Vender</option>
                  <option value="Arrendar">Arrendar</option>
                  <option value="Proyectos">Proyectos</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} name="Descripcion_Empres" onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="Telefono_empresa" onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>País</Form.Label>
                <Form.Select name="Pais_empresa" onChange={handlePaisChange}>
                  <option value="">Selecciona un país</option>
                  <option value="">Colombia</option>
                  <option value="México">México</option>
                </Form.Select>
              </Form.Group>

              {ciudades.length > 0 && (
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Select name="Ciudad_empresa" onChange={handleCiudadChange}>
                    <option value="">Selecciona una ciudad</option>
                    {ciudades.map((ciudad) => (
                      <option key={ciudad} value={ciudad}>{ciudad}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}

            </>
          )}

          <Button type="submit" variant="primary" className="w-100">
            Registrarse
          </Button>
        </Form>

        {success === true && (
          <Alert variant="success" className="mt-4">
            Registro exitoso. Redirigiendo al login...
          </Alert>
        )}
        {success === false && (
          <Alert variant="danger" className="mt-4">
            Ocurrió un error. Inténtalo nuevamente.
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default RegisterForm;
