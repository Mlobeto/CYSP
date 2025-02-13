const express = require('express');
const { crearCiudad } = require('../controllers/ciudadController/crearCiudad');
const { obtenerCiudades } = require('../controllers/ciudadController/obtenerCiudades');
const { obtenerCiudadPorId } = require('../controllers/ciudadController/obtenerCiudadPorId');
const { actualizarCiudad } = require('../controllers/ciudadController/actualizarCiudad');

const router = express.Router();

router.post('/newCity', crearCiudad);
router.get('/todas', obtenerCiudades);
router.get('/:ciudad_id', obtenerCiudadPorId);
router.put('/modificar/:ciudad_id', actualizarCiudad);

module.exports = router;