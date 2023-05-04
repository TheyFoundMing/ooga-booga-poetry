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

io.on("connect", (socket) => {
  // the initial room
  let currentRoom = {};

  socket.on("newGame", (newRoomData) => {
    // updates the current room with the new room
    currentRoom = generateRoom(newRoomData.playerMax);

    // add player into the Room object
    // join player in room ID
    // ns emit to that room with player list along with room ID
    currentRoom.addPlayer(socket.id, newRoomData.playerName);
    socket.join(currentRoom.roomID);
    io.to(currentRoom.roomID).emit("roomData", {
      players: currentRoom.getPlayers(),
      roomID: currentRoom.roomID,
    });
  });

  socket.on("joinGame", (roomData) => {
    if (roomData.roomID in rooms) {
      currentRoom = rooms[roomData.roomID];
      if (!currentRoom.isRoomFull()) {
        currentRoom.addPlayer(socket.id, roomData.playerName);
        socket.join(currentRoom.roomID);
        io.to(currentRoom.roomID).emit("roomData", {
          players: currentRoom.getPlayers(),
          roomID: currentRoom.roomID,
        });
      } else {
        socket.emit("roomFull");
      }
    } else {
      console.log("This room doesn't exist");
      socket.emit("roomNone");
    }
  });

  // the current room is updated by either newRoom or joinRoom
  // makes sure that the player list gets disconnected
  socket.on("disconnect", (reason) => {
    currentRoom.deletePlayer(socket.id);
    io.to(currentRoom.roomID).emit("roomData", {
      players: currentRoom.getPlayers(),
      roomID: currentRoom.roomID,
    });
  });
});

function generateRoomID() {
  return crypto.randomBytes(5).toString("hex");
}

// creates a new room then replaces the currentRoom
function generateRoom(playerMax = 4) {
  let room = new Room(generateRoomID(), playerMax);
  rooms[room.roomID] = room;
  return room;
}
