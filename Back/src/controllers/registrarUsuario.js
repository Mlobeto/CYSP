const { sendMail } = require('./nodemailerController/sendMail');
const { Usuario, Ciudad } = require('../data'); // Corrected path
const response = require('../utils/response');
const geolib = require('geolib');
const bcrypt = require('bcrypt');
const { Op, literal } = require('sequelize'); // Import Op and literal
const { conn } = require('../data');



async function registrarUsuario(req, res) {
  try {
    const { name, email, password, mobilePhone, profilePicture, latitud, longitud } = req.body;

    // Validación de datos (sin cambios)
    if (!name) {
      return response(res, 400, 'El nombre es obligatorio');
    }
    if (!email) {
      return response(res, 400, 'El email es obligatorio');
    }
    if (!isValidEmail(email)) {
      return response(res, 400, 'El email no es válido');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Encuentra la ciudad más cercana usando Sequelize y geolib
    const ciudad = await Ciudad.findOne({
      attributes: ['ciudad_id', 'nombre', 'latitud', 'longitud'],
      order: conn.literal(`
        ST_DistanceSphere(
          geom,
          ST_MakePoint(${longitud}, ${latitud})
        )
      `),
    });

    if (!ciudad) {
      return response(res, 404, 'No se encontró la ciudad');
    }

    const distancia = geolib.getDistance(
      { latitude: latitud, longitude: longitud },
      { latitude: ciudad.latitud, longitude: ciudad.longitud }
    );

    // Crea el usuario con la ciudad encontrada
    const nuevoUsuario = await Usuario.create({
      name,
      email,
      password: hashedPassword,
      mobilePhone,
      ciudad_id: ciudad.ciudad_id, // Usa el ID de la ciudad encontrada
      profilePicture,
    });

    // Send Welcome Email
    await sendMail(
      nuevoUsuario.email,
      'Bienvenido a nuestra aplicación',
      `Hola ${nuevoUsuario.name}, bienvenido a nuestra comunidad!`
    );

    response(res, 201, 'Usuario registrado', nuevoUsuario);

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    response(res, 500, 'Error al registrar usuario', error);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = { registrarUsuario };