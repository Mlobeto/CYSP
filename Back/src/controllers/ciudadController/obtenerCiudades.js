const { Ciudad } = require('../../data');
const response = require('../../utils/response');

async function obtenerCiudades(req, res) {
  try {
    const ciudades = await Ciudad.findAll();

    response(res, 200, 'Cities retrieved successfully', ciudades);

  } catch (error) {
    console.error('Error retrieving cities:', error);
    response(res, 500, 'Failed to retrieve cities', error);
  }
}

module.exports = { obtenerCiudades };