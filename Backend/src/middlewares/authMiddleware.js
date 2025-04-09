import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  // Obtención  del token de la cabecera de autorización (Authorization)
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'No hay token de autenticación.' });
  }

  // Verificacion que el formato del token sea correcto (Bearer <token>)
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ error: 'Formato de token inválido.' });
  }

  const token = parts[1];

  try {
    // Verificacion del token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Adjunta el ID del user

    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'El token de autenticación ha expirado.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token de autenticación inválido.' });
    }
    return res.status(401).json({ error: 'No autorizado.' });
  }
}

export { verifyToken };