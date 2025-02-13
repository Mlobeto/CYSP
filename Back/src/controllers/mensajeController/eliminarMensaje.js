const { Mensaje } = require('../../data');
const response = require('../../utils/response');

async function eliminarMensaje(req, res) {
  try {
    const { id } = req.params;

    const mensajeEliminado = await Mensaje.destroy({
      where: { id },
    });

    if (mensajeEliminado === 0) {
      return response(res, 404, 'Mensaje no encontrado');
    }

    response(res, 200, 'Mensaje eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar mensaje:', error);
    response(res, 500, 'Error al eliminar mensaje', error);
  }
}

module.exports = { eliminarMensaje };