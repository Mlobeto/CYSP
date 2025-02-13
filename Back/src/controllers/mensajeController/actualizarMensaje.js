const { Mensaje } = require('../../data');
const response = require('../../utils/response');

async function actualizarMensaje(req, res) {
  try {
    const { id } = req.params;
    const { mensaje } = req.body;

    const mensajeActualizado = await Mensaje.update(
      { mensaje },
      {
        where: { id },
        returning: true, // Para obtener el mensaje actualizado
      }
    );

    if (mensajeActualizado[0] === 0) {
      return response(res, 404, 'Mensaje no encontrado');
    }

    response(res, 200, 'Mensaje actualizado exitosamente', mensajeActualizado[1][0]);
  } catch (error) {
    console.error('Error al actualizar mensaje:', error);
    response(res, 500, 'Error al actualizar mensaje', error);
  }
}

module.exports = { actualizarMensaje };