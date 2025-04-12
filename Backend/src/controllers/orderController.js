import Order from '../models/order.js';
import Advert from '../models/advert.js';
import User from '../models/user.js';

// Crear una nueva orden
export const createOrder = async (req, res) => {
  const { advertId } = req.body;
  const buyerId = req.user;
  try {
    const advert = await Advert.findById(advertId);

    if (!advert || advert.status !== 'disponible') {
      return res.status(400).json({ message: 'El anuncio no está disponible para compra' });
    }

    const sellerId = advert.user;
    if (buyerId === sellerId.toString()) {
      return res.status(400).json({ message: 'No puedes comprar tu propio anuncio' });
    }

    const newOrder = new Order({
      buyerId,
      sellerId,
      advertId,
      price: advert.price,
      commission: 0,
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Orden creada',
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la orden', error: err.message });
  }
};

// Obtener detalles de una orden
export const getOrderDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la orden por su ID
    const order = await Order.findById(id)
      .populate('buyerId', 'username')
      .populate('sellerId', 'username')
      .populate('advertId', 'title price');

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.status(200).json({
      order,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los detalles de la orden', error: err.message });
  }
};


// Actualizar el estado de una orden
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user;

  try {
    if (!['pending', 'paid', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Estado inválido. Debe ser "pending", "paid", "shipped", "delivered" o "cancelled".' });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    if (order.sellerId.toString() !== userId.toString() && status !== 'paid') {
      return res.status(403).json({ message: 'No tienes permiso para actualizar el estado de esta orden' });
    }

    order.paymentStatus = status;
    order.updatedAt = new Date();

    await order.save();

    res.status(200).json({
      message: 'Estado de la orden actualizado',
      order,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el estado de la orden', error: err.message });
  }
};


// Cancelar una orden
export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    if (order.paymentStatus !== 'pending') {
      return res.status(400).json({ message: 'Solo se pueden cancelar las órdenes en estado "pending"' });
    }

    if (order.buyerId.toString() !== userId.toString() && order.sellerId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para cancelar esta orden' });
    }

    order.paymentStatus = 'cancelled';
    order.updatedAt = new Date();

    await order.save();

    res.status(200).json({
      message: 'Orden cancelada',
      order,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al cancelar la orden', error: err.message });
  }
};


// Obtener todas las órdenes de un usuario autenticado
export const getAllUserOrders = async (req, res) => {
  const userId = req.user;

  try {
    const orders = await Order.find({
      $or: [{ buyerId: userId }, { sellerId: userId }],
    })
      .populate('advertId', 'title price')
      .populate('buyerId', 'username')
      .populate('sellerId', 'username')
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: 'No tienes órdenes.' });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las órdenes', error: err.message });
  }
};