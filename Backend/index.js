const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
