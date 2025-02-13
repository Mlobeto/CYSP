const { actualizarMensaje } = require("./actualizarMensaje");
const {crearMensaje} = require("./crearMensaje");
const obtenerMensajesPorSala = require("./obtenerMensajesPorSala");
const obtenerMensajesPorUsuario = require("./obtenerMensajesPorUsuario");
const { obtenerMensajePorId } = require("./obtenerMensajPorId");
const eliminarMensaje = require("./eliminarMensaje");

module.exports={
    crearMensaje,
    obtenerMensajesPorSala,
    obtenerMensajesPorUsuario,
    actualizarMensaje,
    eliminarMensaje,
    obtenerMensajePorId

}