const { catchedAsync } = require("../utils");

const {forgotPassword} = require("./nodemailerController/forgotPassword");
const resetPassword = require("./nodemailerController/resetPassword");
const registrarUsuario = require("./registrarUsuario");
const crearCiudad = require("./ciudadController/crearCiudad");
const { sendMail } = require("../utils/transporter");
const{obtenerCiudades} = require("./ciudadController/obtenerCiudades");
const{actualizarCiudad} = require("./ciudadController/actualizarCiudad");
const{obtenerCiudadPorId} = require("./ciudadController/obtenerCiudadPorId");
const{ crearSalaChat,
  obtenerSalasChat,
  obtenerSalaChatPorId,
  actualizarSalaChat,
  eliminarSalaChat,
  listarUsuariosEnSala,
  eliminarUsuarioDeSala,
  cambiarUsuarioDeSala}= require("./salasDeChatController");

  const{
     actualizarMensaje,
     crearMensaje, 
     obtenerMensajesPorSala, 
     obtenerMensajesPorUsuario, 
     obtenerMensajePorId, 
     eliminarMensaje}= require("./mensajeController");


module.exports = {
  forgotPassword: catchedAsync(forgotPassword),
  resetPassword: catchedAsync(resetPassword),
  registrarUsuario: catchedAsync(registrarUsuario),
  crearCiudad: catchedAsync(crearCiudad),
  sendMail: catchedAsync(sendMail),
  obtenerCiudades: catchedAsync(obtenerCiudades),
  obtenerCiudadPorId: catchedAsync(obtenerCiudadPorId),
  actualizarCiudad: catchedAsync(actualizarCiudad),
  crearSalaChat: catchedAsync(crearSalaChat),
  obtenerSalasChat: catchedAsync(obtenerSalasChat),
  obtenerSalaChatPorId: catchedAsync(obtenerSalaChatPorId),
  actualizarSalaChat: catchedAsync(actualizarSalaChat),
  eliminarSalaChat: catchedAsync(eliminarSalaChat),
  listarUsuariosEnSala: catchedAsync(listarUsuariosEnSala),
  eliminarUsuarioDeSala: catchedAsync(eliminarUsuarioDeSala),
  cambiarUsuarioDeSala: catchedAsync(cambiarUsuarioDeSala),
  crearMensaje: catchedAsync(crearMensaje),
  obtenerMensajesPorSala: catchedAsync(obtenerMensajesPorSala),
  obtenerMensajesPorUsuario: catchedAsync(obtenerMensajesPorUsuario),
  actualizarMensaje: catchedAsync(actualizarMensaje),
  obtenerMensajePorId: catchedAsync(obtenerMensajePorId),
  eliminarMensaje: catchedAsync(eliminarMensaje)

};
// Compare this snippet from Back/src/controllers/nodemailerController/forgotPassword.js: