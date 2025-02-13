const { Ciudad } = require('../../data');
const response = require('../../utils/response');

async function actualizarCiudad(req, res) {
  try {
    const { ciudad_id } = req.params;
    const { nombre, latitud, longitud } = req.body;

    const ciudad = await Ciudad.findByPk(ciudad_id);

    if (!ciudad) {
      return response(res, 404, 'City not found');
    }

    await ciudad.update({
      nombre,
      latitud,
      longitud,
      geom: { type: 'Point', coordinates: [longitud, latitud] }, // Update the geom value
    });

    response(res, 200, 'City updated successfully', ciudad);

  } catch (error) {
    console.error('Error updating city:', error);
    response(res, 500, 'Failed to update city', error);
  }
}

module.exports = { actualizarCiudad };