const { Mensaje } = require('../../data');
const response = require('../../utils/response');

async function obtenerMensajesPorUsuario(req, res) {
  try {
    const { idUsuario } = req.params;

    const mensajes = await Mensaje.findAll({
      where: { idUsuario },
      order: [['fecha_hora', 'ASC']], // Ordenar por fecha y hora
    });

    response(res, 200, 'Mensajes obtenidos exitosamente', mensajes);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    response(res, 500, 'Error al obtener mensajes', error);
  }
}

module.exports = { obtenerMensajesPorUsuario };