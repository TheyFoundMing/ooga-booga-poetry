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

const rooms = {}; // keeps track of rooms and number of players

// the initial room
let currentRoom = {};
generateRoom();

io.on("connect", (socket) => {
  io.emit("playerList", currentRoom.getPlayers());

  // makes sure that the player list gets disconnected
  socket.on("disconnect", (reason) => {
    currentRoom.deletePlayer(socket.id);
    io.to(currentRoom.roomID).emit("roomData", {
      players: currentRoom.getPlayers(),
      roomID: currentRoom.roomID,
    });
  });

  socket.on("playerJoined", (name) => {
    // add player into the Room object
    // join player in room ID
    // ns emit to that room with player list along with room ID
    currentRoom.addPlayer(socket.id, name);
    socket.join(currentRoom.roomID);
    io.to(currentRoom.roomID).emit("roomData", {
      players: currentRoom.getPlayers(),
      roomID: currentRoom.roomID,
    });

    if (currentRoom.isRoomFull()) {
      // create a new room, replace current room
      generateRoom();
    }
  });
});

function generateRoomID() {
  return crypto.randomBytes(5).toString("hex");
}

// creates a new room then replaces the currentRoom
function generateRoom() {
  let room = new Room(generateRoomID());
  rooms[room.roomID] = room;
  currentRoom = room;
}
