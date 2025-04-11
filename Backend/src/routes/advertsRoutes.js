import express from 'express';
import upload from '../utils/upload.js';
import { getAllAdverts, getAdvertBySlug, searchAdverts, getAdvertStatusBySlug, updateAdvertStatus, uploadImages, getImages, createAdvert, editAdvert  } from '../controllers/advertsController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Anuncios
router.get('/', getAllAdverts); // Obtener todos los anuncios
router.get('/:slug', getAdvertBySlug); // Detalles del anuncio
router.get('/search', searchAdverts); // Filtro de anuncios
router.get('/:slug/status', getAdvertStatusBySlug); // Ver estado del anuncio
// Ver anuncios de un usuario específico se encuentra en usersRoutes.js
router.patch('/:id/status', verifyToken, updateAdvertStatus);  // Cambiar estado y visibilidad del anuncio
router.post('/:id/picture', verifyToken, upload, uploadImages); // Subir imagenes
router.get('/:id/picture', verifyToken, getImages); // Ver imágenes de un anuncio

// Gestión de usuarios
router.post('/', verifyToken, upload, createAdvert); // Crear nuevo anuncio
router.put('/:id', verifyToken, editAdvert);  // Editar anuncio

export default router;
