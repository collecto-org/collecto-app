import express from 'express';
import { getUserAdverts, getCurrentUser, editUserProfile, deleteUserProfile, getOwnAdverts } from '../controllers/usersController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Anuncios
router.get('/:username/listings', getUserAdverts); // Ver anuncios de un usuario específico


// Gestión de usuarios
router.get('/me', verifyToken, getCurrentUser); // Obtener datos del propio usuario
router.put('/me', verifyToken, editUserProfile); // Editar perfil del usuario
router.delete('/me', verifyToken, deleteUserProfile); // Eliminar perfil del usuario
router.get('/me/adverts', verifyToken, getOwnAdverts); // Ver anuncios de uno mismo
// Crear nuevo anuncio se encuentra en advertsRoutes.js
// Editar anuncio se encuentra en advertsRoutes.js
// Eliminar anuncio se encuentra en advertsRoutes.js





export default router;
