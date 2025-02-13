const transporter = require('../../utils/transporter');
const crypto = require('crypto'); 


async function sendMail(destinatario, nombre) {
  try {
    // Generate a unique token (e.g., using crypto)
    const token = crypto.randomBytes(20).toString('hex');

    // Create the registration link with the token
    const enlace = `${process.env.FRONTEND_URL}/register?token=${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: destinatario,
      subject: 'Invitación a la comunidad YSP',
      html: `
        <p>Hola ${nombre},</p>
        <p>¡Te invitamos a unirte a nuestra exclusiva comunidad!</p>
        <p>Para unirte, haz clic en el siguiente enlace: <a href="${enlace}">${enlace}</a></p>
        <p>¡Te esperamos!</p>
      `,
    });
    console.log('Correo de invitación enviado a:', destinatario);
  } catch (error) {
    console.error('Error al enviar correo de invitación:', error);
    // Aquí podrías lanzar una excepción o registrar el error en un sistema de registro.
    throw error; // Re-lanza el error para que pueda ser manejado por quien llama a la función
  }
}

module.exports = { sendMail };