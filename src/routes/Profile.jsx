import { useEffect, useState } from "react";
import { Container, Alert, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");


      try {
        const res = await fetch("http://localhost:8800/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setUser(data); // Aquí se guarda la respuesta del servidor
        if (res.ok) {
          setUser(data);
        } else {
          setError(data.message || "Error al obtener el perfil.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
      }
    };

    fetchProfile();
  }, []);

  const handlePostClick = () => {
    navigate("/post-property");
  };


  return (
    <Container className="mt-5">
      <motion.h2
        className="text-center mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Mi perfil
      </motion.h2>

      {error && (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <Alert variant="danger" className="text-center">{error}</Alert>
        </motion.div>
      )}

      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-3 shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="mb-3">Información del usuario</Card.Title>
              <p><strong>👤 Usuario:</strong> {user.username || localStorage.getItem("username")}</p>
              <p><strong>🆔 ID:</strong> {user.id}</p>
              <p>{user.message}</p>
            </Card.Body>
          </Card>

          <Row className="text-center">
            <Col xs={12} md={6} className="mb-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="success" onClick={handlePostClick}>
                  <FaPlus className="me-2" />
                  Publica tu propiedad
                </Button>
              </motion.div>
            </Col>  
          </Row>
        </motion.div>
      )}
    </Container>
  );
};

export default Profile;
