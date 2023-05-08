const express = require("express");
const app = express();
const socketio = require("socket.io");
const crypto = require("crypto");
const Room = require("./classes/Room.js");
const Round = require("./classes/Round.js");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(3000);
const io = socketio(expressServer);

const joinTeamEvents = require("./sockets/joinTeamEvents.js");
const assignRolesTurns = require("./sockets/assignRolesTurn.js");

console.log("Currently listening on port 3000!");

// on connection, it shall wait on any events from the client
// on a socket's disconnect, the player would be taken out from the game

const rooms = {}; // keeps track of rooms and number of players

io.on("connect", (socket) => {
  // the initial room
  let currentRoom = {};

  // nested & duplicate event listeners are added to both newGame and joinGame events
  // because that's only when the currentRoom var. gets updated and could be
  // used inside the event listeners
  socket.on("newGame", (newRoomData) => {
    // updates the current room with the new room
    currentRoom = generateRoom(newRoomData.playerMax);
    currentRoom.changeRound(new Round());
    currentRoom.increasePlayerCount();

    currentRoom.assignHost(socket.id);
    socket.emit("host");

    socket.join(currentRoom.roomID);
    io.to(currentRoom.roomID).emit("roomData", {
      gladPlayers: currentRoom.getGladPlayers(),
      madPlayers: currentRoom.getMadPlayers(),
      roomID: currentRoom.roomID,
    });

    joinTeamEvents(io, socket, currentRoom);
    assignRolesTurns(io, socket, currentRoom);
  });

  //   callback is dom stuff for script to get rid of the start/join buttons
  socket.on("joinGame", (roomData, callback) => {
    if (roomData.roomID in rooms) {
      currentRoom = rooms[roomData.roomID];
      if (!currentRoom.isRoomFull()) {
        currentRoom.increasePlayerCount();
        socket.join(currentRoom.roomID);
        io.to(currentRoom.roomID).emit("roomData", {
          gladPlayers: currentRoom.getGladPlayers(),
          madPlayers: currentRoom.getMadPlayers(),
          roomID: currentRoom.roomID,
        });
        callback();
      } else {
        socket.emit("roomFull");
      }
    } else {
      console.log("This room doesn't exist");
      socket.emit("roomNone");
    }

    joinTeamEvents(io, socket, currentRoom);
    assignRolesTurns(io, socket, currentRoom);
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
