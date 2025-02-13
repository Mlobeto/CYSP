const { Mensaje } = require('../../data');
const response = require('../../utils/response');

async function obtenerMensajePorId(req, res) {
  try {
    const { id } = req.params;

    const mensaje = await Mensaje.findByPk(id);

    if (!mensaje) {
      return response(res, 404, 'Mensaje no encontrado');
    }

    response(res, 200, 'Mensaje obtenido exitosamente', mensaje);
  } catch (error) {
    console.error('Error al obtener mensaje:', error);
    response(res, 500, 'Error al obtener mensaje', error);
  }
}

module.exports = { obtenerMensajePorId };