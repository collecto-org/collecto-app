import express from 'express';
import { register, login, logout, recoverPassword, verifyRecoverToken, resetPassword, } from '../controllers/authController.js';

const router = express.Router();

// Autenticación y gestión de sesión
router.post('/register', register); // Sign up
router.post('/login', login);  // Login (con opción de "Recordar sesión")
router.post('/logout', logout);  // Logout
router.post('/recover', recoverPassword); // Recuperación de la pasword
router.post('/recover/:token', verifyRecoverToken); // Verificar token de recuperacion
router.post('/reset/:token', resetPassword); // Restablece la password


export default router;
