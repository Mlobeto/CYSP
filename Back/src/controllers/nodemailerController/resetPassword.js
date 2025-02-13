const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Usuario } = require('../../data');
const response = require('../../utils/response');
const transporter = require('../../utils/transporter'); // Importa transporter


async function resetPassword(req, res) {
  try {
    const { newPassword } = req.body;
    const { userId } = req.query; // Extract userId from query parameters

    if (!userId || !newPassword) {
      return response(res, 400, 'User ID and new password are required');
    }

    const usuario = await Usuario.findByPk(userId);

    if (!usuario) {
      return response(res, 404, 'User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await usuario.update({
      password: hashedPassword,
      passwordResetRequired: false,
    });

    response(res, 200, 'Password reset successfully');
    
  } catch (error) {
      console.error('Error resetting password:', error);
      response(res, 500, 'Failed to reset password', error);
  }
}

module.exports = {resetPassword}