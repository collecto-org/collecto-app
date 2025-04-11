import Advert from '../models/advert.js';
import User from '../models/user.js';


// Ver anuncios de un usuario (Endpoint de gestión de anuncios)
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


// Obtener datos del propio usuario (de si mismo)
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      location: user.location,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los datos del usuario', error: err.message });
  }
};

// Editar el perfil del usuario
export const editUserProfile = async (req, res) => {
  const userId = req.user;

  try {
    const updatedData = req.body;


    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Perfil actualizado', user });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el perfil', error: err.message });
  }
};

// Eliminar el perfil del usuario
export const deleteUserProfile = async (req, res) => {
  const userId = req.user;

  try {

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Cuenta eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el perfil', error: err.message });
  }
};


// Ver anuncios de uno mismo
export const getOwnAdverts = async (req, res) => {
  try {
    const userId = req.user;

    const adverts = await Advert.find({ user: userId });

    if (!adverts.length) {
      return res.status(404).json({ message: 'No tienes anuncios publicados.' });
    }

    res.status(200).json(adverts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los anuncios', error: err.message });
  }
};
