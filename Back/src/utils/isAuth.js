const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: true, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);

      // Diferenciación de errores para mejor manejo
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: true, message: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: true, message: 'Invalid token' });
      } else {
        return res.status(401).json({ error: true, message: 'Authentication failed' });
      }
    }

    req.user = decoded; // Almacena la información del usuario decodificada en req.user
    next();
  });
};


