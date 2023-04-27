const express = require("express");
const app = express();
const socketio = require("socket.io");
const crypto = require("crypto");
const Room = require("./classes/Room.js");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(3000);
const io = socketio(expressServer);

console.log("Currently listening on port 3000!");

// on connection, it shall wait on any events from the client
// on a socket's disconnect, the player would be taken out from the game

// const players = {}; // keeps track of the players in the room?
const rooms = {}; // keeps track of rooms and number of players

// the initial room
const room = new Room(generateRoomID(), 4);
console.log(room);
console.log(room.isRoomFull());

io.on("connect", (socket) => {
  io.emit("playerList", room.getPlayers());

  socket.on("playerJoined", (name) => {
    room.addPlayer(socket.id, name);
    io.emit("playerList", room.getPlayers());
  });

  // makes sure that the player list gets disconnected
  socket.on("disconnect", (reason) => {
    room.deletePlayer(socket.id);
    io.emit("playerList", room.getPlayers());
  });
});

function generateRoomID() {
  return crypto.randomBytes(5).toString("hex");
}
