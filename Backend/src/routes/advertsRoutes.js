import express from 'express';
import { getAllAdverts, getAdvertBySlug, searchAdverts, getAdvertStatusBySlug } from '../controllers/advertsController.js';

const router = express.Router();

//Anuncios
router.get('/', getAllAdverts); // Obtener todos los anuncios
router.get('/:slug', getAdvertBySlug); // Detalles del anuncio
router.get('/search', searchAdverts); // Filtro de anuncios
router.get('/:slug/status', getAdvertStatusBySlug); // Ver estado del anuncio

export default router;