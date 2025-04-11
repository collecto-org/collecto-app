import express from 'express';
import { getUserAdverts } from '../controllers/advertsController.js';

const router = express.Router();

// Anuncios
router.get('/:username/listings', getUserAdverts); // Ver anuncios de un usuario específico

// Gestión de usuarios







export default router;
