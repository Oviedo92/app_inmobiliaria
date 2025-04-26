import { useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import baannerpubliciddad from '../assets/baannerpubliciddad.png'; // ✅ Asegúrate de que este archivo exista

const stripePromise = loadStripe("pk_test_51RGVb4CQG721cNIJXZOuFXYctndWLZ5CnnaA9GDTs3fyQU0fj3gU7B5zG4yw6PRawVaD1NO9NLkh89Pl7O6SHejM00D7OLS61g");

const CheckoutForm = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!email || !elements.getElement(CardElement)) {
      setError("Por favor, complete todos los campos.");
      setLoading(false);
      return;
    }

    try {
      const result = {
        paymentIntent: { status: "succeeded" },
      };

      if (result.paymentIntent.status === "succeeded") {
        setSuccess(true);
      } else {
        setError("Hubo un error al procesar el pago.");
      }
    } catch (err) {
      setError("Error procesando el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tarjeta de crédito</Form.Label>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">¡Pago realizado con éxito!</Alert>}

      <Button type="submit" className="w-100" disabled={!stripe || loading}>
        {loading ? "Procesando..." : "Pagar $50.00"}
      </Button>
    </Form>
  );
};

const Services = () => {
  return (
    <Container className="my-5">
      {/* ✅ Imagen promocional */}
      <Card className="mb-4 shadow-sm border-0 overflow-hidden rounded-4">
        <img
          src={baannerpubliciddad}
          alt="Promoción del servicio"
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
      </Card>

      <Card className="shadow rounded-4 p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="mb-4 text-center">Adquirir Servicio Premium</h3>
        <p className="text-center">Por solo $50.00</p>
        <p className="text-center">Completa tus datos de pago a continuación:</p>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="tel" placeholder="123-456-7890" required />
        </Form.Group>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

        <p className="text-center mt-3 text-muted">
          Nuestro equipo se pondrá en contacto contigo. Gracias por confiar en nuestro servicio de marketing para tu negocio. 
          Contacta con nuestro manager <strong>rcgonzalez@unicesar.edu.co</strong> para más información.
        </p>
      </Card>
    </Container>
  );
};

export default Services;
