const express = require("express");
const {
  crearSalaChat,
  obtenerSalasChat,
  obtenerSalaChatPorId,
  actualizarSalaChat,
  eliminarSalaChat,
  listarUsuariosEnSala,
  eliminarUsuarioDeSala,
  cambiarUsuarioDeSala,
} = require("../controllers/index");

const router = express.Router();

router.post("/create", crearSalaChat);
router.get("/todas", obtenerSalasChat);
router.get("/:sala_id", obtenerSalaChatPorId);
router.put("/update/:sala_id", actualizarSalaChat);
router.delete("/delete/:sala_id", eliminarSalaChat);
router.get("/listUsers/:sala_id", listarUsuariosEnSala);
router.delete("/deleteUser/:sala_id", eliminarUsuarioDeSala);
router.put("/changeUser", cambiarUsuarioDeSala);
module.exports = router;
