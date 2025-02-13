const { Usuario } = require('../data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // You'll need to install jsonwebtoken
const response = require('../utils/response');

async function loginUsuario(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return response(res, 400, 'Email and password are required');
    }

    // 2. Find the user by email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return response(res, 401, 'Invalid credentials'); // Authentication failed
    }

    // 3. Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch) {
      return response(res, 401, 'Invalid credentials'); // Authentication failed
    }
    if (usuario.passwordResetRequired) {
        return response(res, 403, 'Password reset required', {
          message: 'Please reset your password before continuing.',
        });
      }
      
      // If passwordResetRequired is false, generate and send the JWT as before
      const token = jwt.sign(
        { userId: usuario.IdUsuario, email: usuario.email, role: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      response(res, 200, 'Login successful', { token });

  } catch (error) {
    console.error('Error during login:', error);
    response(res, 500, 'Login failed', error);
  }
}

module.exports = { loginUsuario };