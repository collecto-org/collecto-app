import Advert from '../models/advert.js';

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
    // Filtro por condición (nuevo, usado, roto)
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
