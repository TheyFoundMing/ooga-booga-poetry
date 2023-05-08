// assign roles, handles the game's rounds and turns

function assignRolesTurns(io, socket, currentRoom) {
  socket.on("startGame", () => {
    if (socket.id == currentRoom.host) {
      currentRoom.round.formTurns();
      const { poetName, poetID, poetTeam } = currentRoom.round.pickPoet();

      io.to(currentRoom.roomID).emit("neanderthalPoet", poetName);

      if (poetTeam == "glad") {
        Object.keys(currentRoom.round.getGladPlayers()).forEach((player) => {
          if (player != poetID) {
            io.to(player).emit("humanGuesser");
          }
        });
        Object.keys(currentRoom.round.getMadPlayers()).forEach((player) => {
          io.to(player).emit("manWithStick");
        });
      } else {
        Object.keys(currentRoom.round.getGladPlayers()).forEach((player) => {
          if (player != poetID) {
            io.to(player).emit("humanGuesser");
          }
        });
        Object.keys(currentRoom.round.getMadPlayers()).forEach((player) => {
          io.to(player).emit("manWithStick");
        });
      }
    }
  });

  socket.on("nextTurn", () => {});
}

module.exports = assignRolesTurns;
