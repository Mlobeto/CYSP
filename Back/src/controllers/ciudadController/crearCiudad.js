const { Ciudad } = require('../../data');
const response = require('../../utils/response');

async function crearCiudad(req, res) {
  try {
    const { nombre, latitud, longitud } = req.body;

    // Validate input
    if (!nombre || !latitud || !longitud) {
      return response(res, 400, 'Name, latitude, and longitude are required');
    }

    // Check if a city with the same name already exists
    const existingCiudad = await Ciudad.findOne({ where: { nombre } });

    if (existingCiudad) {
      return response(res, 400, 'A city with this name already exists');
    }

    const nuevaCiudad = await Ciudad.create({
      nombre,
      latitud,
      longitud,
      geom: { type: 'Point', coordinates: [longitud, latitud] }, // Create the geom value
    });

    response(res, 201, 'City created successfully', nuevaCiudad);

  } catch (error) {
    console.error('Error creating city:', error);
    response(res, 500, 'Failed to create city', error);
  }
}

module.exports = { crearCiudad };