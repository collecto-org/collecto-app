import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


// Sign up
export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    phone,
    location,
    avatarUrl,
    bio,
    direccionId
  } = req.body;

  try {
    // mirar si ya se ha registrado
    const userExists = await User.findOne({
      $or: [{ email }, { username }] // ojo!!!!!!!!! revisar si hay que añadir otro campo que no se repita
    });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // hasheo de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = await User.create({
      username,
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
      location,
      avatarUrl,
      bio,
      direccionId,
    });

    res.status(201).json({
      message: 'Usuario registrado',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
  }
};



// Login (con opcion de recordar sesión)
export const login = async (req, res) => {
  const { username, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verifica contraseña
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar JWT expiración de 30 días si se recuerda la sesión, 1h si no
    const expiresIn = rememberMe ? '30d' : '1h';

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET, // ojo!!
      { expiresIn }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login', error: err.message });
  }
};



// Logout
export const logout = (req, res) => {
  try {
    res.clearCookie("token");  // elimina la cookie del token JWT.

    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al cerrar sesión', error: err.message });
  }
};



// Recuperación de contraseña
export const recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Token de recuperacion de 1h
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Recuperación de contraseña',
      text: `Haga clic en el siguiente enlace para restablecer su contraseña: http://localhost:3000/api/auth/reset/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ message: 'Error al enviar correo', error: err.message });
      }
      res.status(200).json({ message: 'Correo de recuperación enviado' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al recuperar contraseña', error: err.message });
  }
};



// Verificar el token que recuipera la contraseña
export const verifyRecoverToken = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({ message: 'Token de recuperación válido', userId: decoded.id });
  } catch (err) {
    res.status(400).json({ message: 'Token de recuperación inválido o expirado' });
  }
};



// Restablecer contraseña
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.passwordHash = passwordHash; 
    user.updatedAt = Date.now(); 
    await user.save();

    // COnfirmacion de contraseña restablecida
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Contraseña restablecida',
      text: 'Su contraseña ha sido restablecida correctamente.',
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al enviar el correo de confirmación' });
      } else {
        console.log('Correo de confirmación enviado:', info.response);
        return res.status(200).json({ message: 'Contraseña actualizada y correo de confirmación enviado' });
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Error al restablecer la contraseña', error: err.message });
  }
};