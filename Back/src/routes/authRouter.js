const  Router  = require('express');

const { loginUsuario } = require('../controllers/loginUsuario');
const { registrarUsuario } = require('../controllers/registrarUsuario');

const router = Router();

router.post('/login', loginUsuario);
router.post('/register', registrarUsuario);


module.exports = router;