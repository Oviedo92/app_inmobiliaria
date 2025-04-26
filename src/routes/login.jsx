// src/routes/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

     // Verificación manual para admin
  if (formData.email === "admin@lamaestate.com" && formData.password === "admin123") {
    setMessage("✅ Bienvenido administrador. Redirigiendo...");
    setTimeout(() => {
      navigate("/admin");
    }, 800);
    return; // Evita que continúe con el login normal
  }

    try {
      // Asegúrate de que formData tenga los campos correctos (email, password)
      const res = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // Enviar formData con el campo fromSQL añadido
        body: JSON.stringify({
          ...formData  // Desestructuramos formData para incluir sus valores (email, password)
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Guardamos el token y el userId en localStorage
        localStorage.setItem("token", data.token); // ✅
        localStorage.setItem("userId", data.user.id); // ✅ Esto sí existe en la respuesta
        localStorage.setItem("username", data.user.username); // ✅ Esto sí existe en la respuesta


        setMessage("✅ ¡Login exitoso! Redirigiendo...");
        setTimeout(() => {
          navigate("/profile"); // Cambia esto a la ruta que desees redirigir
        }, 800);
      } else {
        setMessage("❌ " + data.message);
      }

    } catch (err) {
      setMessage("❌ Error al conectar con el servidor.");
    }
  };


  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Iniciar sesión</h2>
      {message && <Alert variant={message.startsWith("✅") ? "success" : "danger"}>{message}</Alert>}
      <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Ingrese su correo"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">Entrar</Button>
      </Form>
    </Container>
  );
};

export default Login;
