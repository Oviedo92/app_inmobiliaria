import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // <--- Agrega esto
import bodyParser from 'body-parser'; // Si no lo tienes
import dotenv from 'dotenv'; // <--- Agrega esto también
import authRoutes from './routes/auth.route.js'; // Asumiendo que tienes tus rutas de auth


dotenv.config(); // <-- Carga las variables del archivo .env
const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite solo el frontend en el puerto 3000
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Middleware para manejar las cookies
app.use(cookieParser()); // <--- para leer cookies
// Middleware para parsear el cuerpo de las solicitudes (si lo necesitas)
app.use(bodyParser.json());

// Definir las rutas
app.use('/api/auth', authRoutes); // Asegúrate de tener la ruta '/api/auth' configurada en tu archivo de rutas



// Puerto de escucha del backend
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



