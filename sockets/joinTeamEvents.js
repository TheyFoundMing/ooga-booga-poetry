// to handle joining teams and disconnects

function joinTeamEvents(io, socket, currentRoom) {
  socket.on("joinGlad", (playerName) => {
    currentRoom.round.addToGlad(socket.id, playerName);
    console.log("added to Glad");
    io.to(currentRoom.roomID).emit("roomData", {
      gladPlayers: currentRoom.round.getGladPlayers(),
      madPlayers: currentRoom.round.getMadPlayers(),
      roomID: currentRoom.roomID,
    });
  });

  socket.on("joinMad", (playerName) => {
    currentRoom.round.addToMad(socket.id, playerName);
    console.log("added to Mad");
    io.to(currentRoom.roomID).emit("roomData", {
      gladPlayers: currentRoom.round.getGladPlayers(),
      madPlayers: currentRoom.round.getMadPlayers(),
      roomID: currentRoom.roomID,
    });
  });

  socket.on("disconnect", (reason) => {
    try {
      currentRoom.decreasePlayerCount();
      currentRoom.round.disconnectPlayer(socket.id);
      io.to(currentRoom.roomID).emit("roomData", {
        gladPlayers: currentRoom.round.getGladPlayers(),
        madPlayers: currentRoom.round.getMadPlayers(),
        roomID: currentRoom.roomID,
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = joinTeamEvents;
