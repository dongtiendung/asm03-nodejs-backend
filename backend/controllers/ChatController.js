const Room = require("../models/ChatRoom");
const Message = require("../models/Message");

const clientChat = (socket) => {
  const client = socket.of("/client");
  client.emit("client", "hello");
  socket.on("event1", (data) => {
    console.log("Event 1 received", data);
    // Handle event1 for Namespace 1
  });
  client.on("client:client1", (a) => console.log(a));
  socket.of("/client").on("client1", (a) => console.log(a));
};
const adminChat = (socket) => {
  console.log();
};

module.exports = { clientChat, adminChat };
