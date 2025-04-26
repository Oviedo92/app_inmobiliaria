import { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal, Tabs, Tab } from "react-bootstrap";

const Admin = () => {
  const [data, setData] = useState({
    Personas: [],
    Empresa: [],
    ReporteEmpresa: [],
    ReporteUsuario: [],
    ClientelaEmpre: [],
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState("Personas");

  const endpoints = {
    Personas: "Personas",
    Empresa: "Empresa",
    ReporteEmpresa: "ReporteEmpresa",
    ReporteUsuario: "ReporteUsuario",
    ClientelaEmpre: "ClientelaEmpre",
  };

  const fieldsToIgnore = {
    Personas: ["id_persona", "administrador", "direccion"],
    Empresa: ["id_empresa"],
    ReporteEmpresa: ["id_reporte"],
    ReporteUsuario: ["id_reporte"],
    ClientelaEmpre: ["id_codigo_cliente"],
  };

  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(`https://localhost:7081/api/${endpoint}`);
      const fetchedData = await res.json();
      setData((prev) => ({ ...prev, [endpoint]: fetchedData }));
    } catch (error) {
      console.error(`Error cargando ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    Object.values(endpoints).forEach(fetchData);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este registro?")) {
      try {
        await fetch(`https://localhost:7081/api/${currentEndpoint}/${id}`, {
          method: "DELETE",
        });
        fetchData(currentEndpoint);
      } catch (error) {
        console.error("Error eliminando:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const idField = Object.keys(selectedItem).find((key) => key.startsWith("id_"));
      await fetch(`https://localhost:7081/api/${currentEndpoint}/${selectedItem[idField]}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItem),
      });
      setShowEditModal(false);
      fetchData(currentEndpoint);
    } catch (error) {
      console.error("Error actualizando:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Panel de Administración</h2>
      <Tabs
        defaultActiveKey="Personas"
        id="admin-tabs"
        className="mb-3"
        onSelect={(k) => setCurrentEndpoint(k)}
      >
        {Object.keys(endpoints).map((key) => (
          <Tab eventKey={key} title={key} key={key}>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  {(data[key][0] && Object.keys(data[key][0]))?.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data[key].map((item) => (
                  <tr key={Object.values(item)[0]}> {/* Usar primer valor como key */}
                    {Object.values(item).map((val, i) => (
                      <td key={i}>{val?.toString()}</td>
                    ))}
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(Object.values(item)[0])}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        ))}
      </Tabs>

      {/* Modal para editar */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              {Object.keys(selectedItem)
                .filter((key) => !fieldsToIgnore[currentEndpoint].includes(key))
                .map((key) => (
                  <Form.Group className="mb-2" key={key}>
                    <Form.Label>{key}</Form.Label>
                    <Form.Control
                      type="text"
                      name={key}
                      value={selectedItem[key] || ""}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;
