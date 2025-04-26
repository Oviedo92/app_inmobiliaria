import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const JobUsers = () => {
  const [formData, setFormData] = useState({
    Nombre_apellido: '',
    Tipo_doc: '',
    Doc_id: '',
    Telefono_clientela: '',
    Correo_clientela: '',
    Canal_preferencia: '',
    Canal_alternativo: '',
    id_empresa: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const requestData = {
      Nombre_apellido: formData.Nombre_apellido,
      Tipo_doc: formData.Tipo_doc,
      Doc_id: formData.Doc_id,
      Telefono_clientela: formData.Telefono_clientela,
      Correo_clientela: formData.Correo_clientela,
      Canal_preferencia: formData.Canal_preferencia,
      Canal_alternativo: formData.Canal_alternativo,
      id_empresa: formData.id_empresa,
    };

    try {
      // Enviar los datos al servidor usando fetch
      const response = await fetch('https://localhost:7081/api/ClientelaEmpre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log(requestData);

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        console.log('Datos enviados correctamente');
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Formulario de trabajos - Empresas</h2>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombres y Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. Juan Pérez"
                name="Nombre_apellido"
                value={formData.Nombre_apellido}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Documento</Form.Label>
              <Form.Control
                as="select"
                name="Tipo_doc"
                value={formData.Tipo_doc}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleccionar --</option>
                <option value="cedula">Cédula</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="tarjetaIdentidad">Tarjeta de Identidad</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Documento"
                name="Doc_id"
                value={formData.Doc_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Número de contacto"
                name="Telefono_clientela"
                value={formData.Telefono_clientela}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ej. juan@mail.com"
                name="Correo_clientela"
                value={formData.Correo_clientela}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Selecciona tu canal principal</Form.Label>
              <Form.Control
                as="select"
                name="Canal_preferencia"
                value={formData.Canal_preferencia}
                onChange={handleChange}
                required
              >
                <option value="llamadas">Llamadas telefónicas</option>
                <option value="sms">SMS</option>
                <option value="correo">Correo electrónico</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Selecciona tu canal alternativo</Form.Label>
              <Form.Control
                as="select"
                name="Canal_alternativo"
                value={formData.Canal_alternativo}
                onChange={handleChange}
                required
              >
                <option value="sms">SMS</option>
                <option value="correo">Correo electrónico</option>
                <option value="whatsapp">WhatsApp</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username del propietario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el username del propietario"
                name="id_empresa"
                value={formData.id_empresa}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Autorizo a LamaEstate para ponerse en contacto a través de los canales seleccionados para gestión de cobranza"
              required
            />

            <Form.Check
              type="checkbox"
              label="Autorizo a LamaEstate para ponerse en contacto a través de los canales seleccionados para fines publicitarios o comerciales"
              required
            />

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default JobUsers;
