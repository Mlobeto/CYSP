const { Mensaje } = require('../../data');
const response = require('../../utils/response');

async function obtenerMensajesPorSala(req, res) {
  try {
    const { sala_id } = req.params;

    const mensajes = await Mensaje.findAll({
      where: { sala_id },
      order: [['fecha_hora', 'ASC']], // Ordenar por fecha y hora
    });

    response(res, 200, 'Mensajes obtenidos exitosamente', mensajes);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    response(res, 500, 'Error al obtener mensajes', error);
  }
}

module.exports = { obtenerMensajesPorSala };