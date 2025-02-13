const { Mensaje } = require('../../data');
const response = require('../../utils/response');

async function crearMensaje(req, res) {
  try {
    const { sala_id, idUsuario, mensaje } = req.body;

    const nuevoMensaje = await Mensaje.create({
      sala_id,
      idUsuario,
      mensaje,
    });

    response(res, 201, 'Mensaje creado exitosamente', nuevoMensaje);
  } catch (error) {
    console.error('Error al crear mensaje:', error);
    response(res, 500, 'Error al crear mensaje', error);
  }
}

module.exports = { crearMensaje };