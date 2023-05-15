const {Socket} = require("socket.io");

// socket = new Socket()
// Eso no es necesario y no se recomienda, sin embargo por temas para reconocer ciertas funciones en el editor se usa, en producción no
const socketController = (socket = new Socket()) => {
  // console.log("Cliente Conectado", socket.id);
};

module.exports = {
  socketController,
};
