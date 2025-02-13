const { Ciudad } = require('../../data');
const response = require('../../utils/response');

async function obtenerCiudadPorId(req, res) {
  try {
    const { ciudad_id } = req.params;

    const ciudad = await Ciudad.findByPk(ciudad_id);

    if (!ciudad) {
      return response(res, 404, 'City not found');
    }

    response(res, 200, 'City retrieved successfully', ciudad);

  } catch (error) {
    console.error('Error retrieving city:', error);
    response(res, 500, 'Failed to retrieve city', error);
  }
}

module.exports = { obtenerCiudadPorId };