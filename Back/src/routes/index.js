const { Router } = require("express");

const router = Router();

router.use("/auth", require("./authRouter"));
router.use("/ciudad", require("./ciudadRouter"));
router.use("/mailer", require("./nodemailerRouter"));
router.use("/salas", require("./salasDechatRouter"));
router.use('/mensajes', require('./mensajerouter'));


module.exports = router;