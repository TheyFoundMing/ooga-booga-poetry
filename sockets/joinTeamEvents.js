// to handle joining teams and disconnects

function joinTeamEvents(io, socket, currentRoom) {
  socket.on("joinGlad", (playerName) => {
    currentRoom.round.addToGlad(socket.id, playerName);
    console.log("added to Glad");
    io.to(currentRoom.roomID).emit("roomData", {
      gladPlayers: currentRoom.getGladPlayers(),
      madPlayers: currentRoom.getMadPlayers(),
      roomID: currentRoom.roomID,
    });
  });

  socket.on("joinMad", (playerName) => {
    currentRoom.round.addToMad(socket.id, playerName);
    console.log("added to Mad");
    io.to(currentRoom.roomID).emit("roomData", {
      gladPlayers: currentRoom.getGladPlayers(),
      madPlayers: currentRoom.getMadPlayers(),
      roomID: currentRoom.roomID,
    });
  });
}

module.exports = joinTeamEvents;
