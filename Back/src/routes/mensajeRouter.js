const express = require('express');
const {  crearMensaje, eliminarMensaje, obtenerMensajePorId, obtenerMensajesPorUsuario, actualizarMensaje, obtenerMensajesPorSala} = require('../controllers/index');

const router = express.Router();

router.post('/new', crearMensaje );
router.put('/update/:id', actualizarMensaje );
router.delete('/delete/:id', eliminarMensaje ); 
router.get('/get/:id', obtenerMensajePorId );
router.get('/getUser/:idUsuario', obtenerMensajesPorUsuario );
router.get('/getSala/:sala_id', obtenerMensajesPorSala );
module.exports = router;