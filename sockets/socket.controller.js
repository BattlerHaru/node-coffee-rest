const {Socket} = require("socket.io");
const {jwtCheck} = require("../helpers");
const {ChatMessages} = require("../models/index.models");

const chatMessages = new ChatMessages();

// socket = new Socket()
// Eso no es necesario y no se recomienda, sin embargo por temas para reconocer ciertas funciones en el editor se usa, en producción no
const socketController = async (socket = new Socket(), io) => {
  const user = await jwtCheck(socket.handshake.headers["x-token"]);
  if (!user) {
    return socket.disconnect();
  }

  // add connect user
  chatMessages.connectUser(user);
  io.emit("active-users", chatMessages.usersArr);

  // console.log(`${user.name} conectado.`);
  socket.on("disconnect", () => {
    chatMessages.disconnectUser(user.id);
    io.emit("active-users", chatMessages.usersArr);
  });
};

module.exports = {
  socketController,
};
