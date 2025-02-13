
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Usuario } = require('../../data');
const response = require('../../utils/response');
const transporter = require('../../utils/transporter'); // Importa transporter


async function forgotPassword(req, res) { // Envuelve la función con catchAsync
  try {
  const { email } = req.body;

  const user = await Usuario.findOne({ where: { email } });

  if (!user) {
    return response(res, 404, "Usuario no encontrado");
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = await bcrypt.hash(resetToken, 10);

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

  const message = `Recibiste este correo electrónico porque tú (o alguien más) solicitó restablecer la contraseña. Haga clic en el siguiente enlace para restablecer su contraseña: \n\n ${resetUrl}`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: 'Restablecimiento de contraseña',
    text: message,
  };

  await transporter.sendMail(mailOptions); // Usa transporter directamente

  response(res, 200, "Correo electrónico de restablecimiento de contraseña enviado");
} catch (error) {
  console.error('Error en envío',error);
  response(res, 500, 'Failed to create send', error);
}
}


module.exports = { forgotPassword };