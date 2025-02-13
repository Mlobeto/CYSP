const { SalaDeChat, Usuario } = require('../data');
const response = require('../utils/response');

// Create
async function crearSalaChat(req, res) {
    try {
      console.log('Request body:', req.body); // Log the request body
  
      const { ciudad_id, nombre, rango_km } = req.body;
  
      console.log('SalaChat model:', SalaDeChat); // Log the SalaChat model
  
      const nuevaSala = await SalaDeChat.create({
        ciudad_id,
        nombre,
        rango_km
      });
  
      console.log('New chat room created:', nuevaSala); // Log the newly created chat room
  
      response(res, 201, 'Chat room created successfully', nuevaSala);
  
    } catch (error) {
      console.error('Error creating chat room:', error);
      console.error('Error details:', error.message); // Log the error message
      response(res, 500, 'Failed to create chat room', error);
    }
  }

// Read (All)
async function obtenerSalasChat(req, res) {
  try {
    const salas = await SalaDeChat.findAll();

    response(res, 200, 'Chat rooms retrieved successfully', salas);

  } catch (error) {
    console.error('Error retrieving chat rooms:', error);
    response(res, 500, 'Failed to retrieve chat rooms', error);
  }
}

// Read (by ID)
async function obtenerSalaChatPorId(req, res) {
  try {
    const { sala_id } = req.params;

    const sala = await SalaDeChat.findByPk(sala_id);

    if (!sala) {
      return response(res, 404, 'Chat room not found');
    }

    response(res, 200, 'Chat room retrieved successfully', sala);

  } catch (error) {
    console.error('Error retrieving chat room:', error);
    response(res, 500, 'Failed to retrieve chat room', error);
  }
}

// Update
async function actualizarSalaChat(req, res) {
  try {
    const { sala_id } = req.params;
    const { nombre } = req.body;

    const sala = await SalaDeChat.findByPk(sala_id);

    if (!sala) {
      return response(res, 404, 'Chat room not found');
    }

    await sala.update({ nombre });

    response(res, 200, 'Chat room updated successfully', sala);

  } catch (error) {
    console.error('Error updating chat room:', error);
    response(res, 500, 'Failed to update chat room', error);
  }
}

// Delete
async function eliminarSalaChat(req, res) {
  try {
    const { sala_id } = req.params;

    const sala = await SalaDeChat.findByPk(sala_id);

    if (!sala) {
      return response(res, 404, 'Chat room not found');
    }

    await sala.destroy();

    response(res, 200, 'Chat room deleted successfully');

  } catch (error) {
    console.error('Error deleting chat room:', error);
    response(res, 500, 'Failed to delete chat room', error);
  }
}

// List Users in a Chat Room
async function listarUsuariosEnSala(req, res) {
  try {
    const { sala_id } = req.params;

    const sala = await SalaDeChat.findByPk(sala_id, {
      include: [{
        model: Usuario,
        attributes: ['IdUsuario', 'name', 'email'], // Specify the attributes you want to retrieve
        through: { attributes: [] } // Exclude attributes from the join table
      }]
    });

    if (!sala) {
      return response(res, 404, 'Chat room not found');
    }

    response(res, 200, 'Users in chat room retrieved successfully', sala.Usuarios);

  } catch (error) {
    console.error('Error retrieving users in chat room:', error);
    response(res, 500, 'Failed to retrieve users in chat room', error);
  }
}

// Remove User from a Chat Room
async function eliminarUsuarioDeSala(req, res) {
  try {
    const { sala_id, usuarioId } = req.params;

    const sala = await SalaDeChat.findByPk(sala_id);
    const usuario = await Usuario.findByPk(usuarioId);

    if (!sala || !usuario) {
      return response(res, 404, 'Chat room or user not found');
    }

    await sala.removeUsuario(usuario); // Use the remove method provided by Sequelize

    response(res, 200, 'User removed from chat room successfully');

  } catch (error) {
    console.error('Error removing user from chat room:', error);
    response(res, 500, 'Failed to remove user from chat room', error);
  }
}

// Change User's Chat Room
async function cambiarUsuarioDeSala(req, res) {
  try {
    const { usuarioId, salaIdAnterior, salaIdNueva } = req.body;

    const usuario = await Usuario.findByPk(usuarioId);
    const salaAnterior = await SalaDeChat.findByPk(salaIdAnterior);
    const salaNueva = await SalaDeChat.findByPk(salaIdNueva);

    if (!usuario || !salaAnterior || !salaNueva) {
      return response(res, 404, 'User or chat rooms not found');
    }

    // Remove the user from the old chat room
    await salaAnterior.removeUsuario(usuario);

    // Add the user to the new chat room
    await salaNueva.addUsuario(usuario);

    response(res, 200, 'User changed chat room successfully');

  } catch (error) {
    console.error('Error changing user chat room:', error);
    response(res, 500, 'Failed to change user chat room', error);
  }
}

module.exports = {
  crearSalaChat,
  obtenerSalasChat,
  obtenerSalaChatPorId,
  actualizarSalaChat,
  eliminarSalaChat,
  listarUsuariosEnSala,
  eliminarUsuarioDeSala,
  cambiarUsuarioDeSala
};