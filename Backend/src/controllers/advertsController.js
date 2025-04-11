import Advert from '../models/advert.js';
import User from '../models/user.js';
import Notification from '../models/notification.js';

import multer from 'multer';



// Sacar todos los anuncios (con pag y filtros)
export const getAllAdverts = async (req, res) => {
  try {

    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query; 

    const adverts = await Advert.find()
      .select('title price mainImage status slug') // Ojoooo!!!!!! revisar si hay que añadir más campos para mostrar de la vista de anuncioS
      .sort({ [sortBy]: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (!adverts.length) {
      return res.status(404).json({ message: 'No se encontraron anuncios' });
    }

    res.status(200).json(adverts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener anuncios', error: err.message, stack: err.stack });
  }
};


// Detalle de un anuncio
export const getAdvertBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const advert = await Advert.findOne({ slug });
    if (!advert) {
      return res.status(404).json({ message: 'Anuncio no encontrado' });
    }
    res.status(200).json(advert);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el anuncio', error: err.message });
  }
};


// Filtro de anuncios
export const searchAdverts = async (req, res) => {
  try {

    const {
      title,
      priceMin,
      priceMax,
      tags,
      status,
      transaction,
      collection,
      createdAtMin,
      createdAtMax,
      brand,
      product_type,
      universe,
      condition,
      slug,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = -1,
    } = req.query;

    const query = {};

    // Filtros
    // Filtro por título
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    // Filtro por precio
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // Filtro por tags
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }
    // Filtro por estado del anuncio (disponible/reservado/vendido)
    if (status) {
      query.status = status;
    }
    // Filtro por tipo de transacción (venta/compra)
    if (transaction) {
      query.transaction = transaction;
    }
    // Filtro por colección
    if (collection) {
      query.collection = collection;
    }
    // Filtro por marca
    if (brand) {
      query.brand = brand;
    }
    // Filtro por tipo de producto (Figuras/Cartas/...)
    if (product_type) {
      query.product_type = product_type;
    }
    // Filtro por universo (Dragon Ball/Marvel/...)
    if (universe) {
      query.universe = universe;
    }
    // Filtro por condición (nuevo/usado/roto)
    if (condition) {
      query.condition = condition;
    }
    // Filtro por fecha de creación (rango de fechas)
    if (createdAtMin || createdAtMax) {
      query.createdAt = {};
      if (createdAtMin) query.createdAt.$gte = new Date(createdAtMin);
      if (createdAtMax) query.createdAt.$lte = new Date(createdAtMax);
    }
    // Filtro por slug
    if (slug) {
      query.slug = { $regex: slug, $options: 'i' };
    }

    console.log(query);
    const adverts = await Advert.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder });

    if (!adverts.length) {
      return res.status(404).json({ message: 'No se encontraron anuncios' });
    }

    res.status(200).json(adverts);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar anuncios', error: err.message });
  }
};


// Estado del anuncio (por slug)
export const getAdvertStatusBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const advert = await Advert.findOne({ slug }).select('status');
    if (!advert) {
      return res.status(404).json({ message: 'Anuncio no encontrado' });
    }
    res.status(200).json({ estado: advert.status });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el estado del anuncio', error: err.message });
  }
};


// Ver anuncios de un usuario
export const getUserAdverts = async (req, res) => {
  const { username } = req.params;  // Traemos el username desde los params de la URL

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    const adverts = await Advert.find({ user: user._id });

    if (!adverts.length) {
      return res.status(404).json({ message: 'No se encontraron anuncios para este usuario' });
    }

    res.status(200).json(adverts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los anuncios del usuario', error: err.message });
  }
};


// Actualizar estado y visibilidad
export const updateAdvertStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;  // Estado

  try {
    // Busca el anuncio por ID
    const advert = await Advert.findById(id);
    if (!advert) {
      return res.status(404).json({ message: 'Anuncio no encontrado' });
    }

    advert.status = status;
    // Cambiar visibilidad
    if (status === 'vendido') {
      advert.isVisible = false;
    } else if (status === 'disponible' || status === 'reservado') {
      advert.isVisible = true; 
    }

    await advert.save();
    // Notificar a los usuarios si el anuncio está en favoritos
    const usersWithFavorite = await User.find({ 'favorites': advert._id });

    if (usersWithFavorite.length > 0) {
      usersWithFavorite.forEach(async (user) => {
        const newNotification = new Notification({
          user: user._id,
          message: `El anuncio "${advert.title}" ha cambiado su estado a ${advert.status}.`,
          read: false,
          advert: advert._id,
        });
        await newNotification.save();
      });
    }

    res.status(200).json({
      message: `El estado del anuncio ha sido cambiado a ${advert.status} y su visibilidad ha sido actualizada.`,
      advert,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar el estado del anuncio', error: err.message });
  }
};


// Subir imagen de un anuncio
export const uploadImages = async (req, res) => {
  const advertId = req.params.id;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No se han cargado imágenes' });
  }

  const imagePaths = req.files.map(file => file.path);  // Saca las rutas de las imágenes

  try {
    const advert = await Advert.findByIdAndUpdate(
      advertId,
      { $push: { images: { $each: imagePaths } } },  // mete las imágenes al array del anuncio
      { new: true }
    );

    if (!advert) {
      return res.status(404).json({ message: 'Anuncio no encontrado' });
    }

    res.status(201).json({
      message: 'Imágenes subidas',
      images: imagePaths,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al subir las imágenes', error: err.message });
  }
};


// Ver todas las imágenes del un anuncio
export const getImages = async (req, res) => {
  const advertId = req.params.id;

  try {
    const advert = await Advert.findById(advertId);

    if (!advert) {
      return res.status(404).json({ message: 'Anuncio no encontrado' });
    }

    res.status(200).json({ images: advert.images });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las imágenes', error: err.message });
  }
};



// Crear nuevo anuncio
export const createAdvert = async (req, res) => {
  const {
    title,
    description,
    price,
    transaction,
    status,
    product_type,
    universe,
    condition,
    collection,
    brand,
    tags,
  } = req.body;
  const userId = req.user;  // Usando el id del usuario del token JWT

  try {
    // Validación de los campos obligatorios                         Ojo!! Revisar
    if (!title || !description || !price || !transaction || !status || !product_type || !universe || !condition) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Precio sea mayor que 0
    if (price <= 0) {
      return res.status(400).json({ message: 'El precio debe ser mayor a 0' });
    }

    // Al menos un tag
    if (tags && tags.length === 0) {
      return res.status(400).json({ message: 'Debe haber al menos un tag' });
    }

    // Crear el nuevo anuncio
    const newAdvert = new Advert({
      title,
      description,
      price,
      transaction,
      status,
      product_type,
      universe,
      condition,
      collection,
      brand,
      tags,
      user: userId,  // Asociando el anuncio al usuario
      mainImage: req.files && req.files.length > 0 ? req.files[0].path : '',
      images: req.files ? req.files.map(file => file.path) : [],
    });

    await newAdvert.save();

    res.status(201).json({
      message: 'Anuncio creado',
      anuncio: newAdvert,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el anuncio', error: err.message });
  }
};
