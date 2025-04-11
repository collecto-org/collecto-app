import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import advertsRoutes from './routes/advertsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Rutas de autenticación
app.use('/api/auth', authRoutes);
// Rutas de anuncios
app.use('/api/adverts', advertsRoutes);
// Rutas de usuarios
app.use('/api/users', usersRoutes);




// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
