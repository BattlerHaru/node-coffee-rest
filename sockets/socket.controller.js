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

  // on connect
  chatMessages.connectUser(user);
  io.emit("active-users", chatMessages.usersArr);
  io.emit("get-message", chatMessages.last10);

  // on disconnect
  socket.on("disconnect", () => {
    chatMessages.disconnectUser(user.id);
    io.emit("active-users", chatMessages.usersArr);
  });

  // on send message
  socket.on("send-message", ({uid, message}) => {
    chatMessages.sendMessage(user.id, user.name, message);
    io.emit("get-message", chatMessages.last10);
  });
};

module.exports = {
  socketController,
};
