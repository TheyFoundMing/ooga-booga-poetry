// assign roles, handles the game's rounds and turns
const nextPoetTurn = require("./nextPoetTurn");

function assignRolesTurns(io, socket, currentRoom) {
  socket.on("startGame", () => {
    if (socket.id == currentRoom.host) {
      currentRoom.round.formTurns();
      nextPoetTurn(io, currentRoom);
      io.to(currentRoom.roomID).emit("startGame");
    }
  });

  socket.on("nextTurn", () => {
    if (socket.id == currentRoom.round.currentPoet) {
      if (currentRoom.round.hasGameEnded()) {
        io.to(currentRoom.roomID).emit(
          "gameEnd",
          currentRoom.scoreboard.declareWinner()
        );
      } else {
        nextPoetTurn(io, currentRoom);
      }
    }
  });
}

module.exports = assignRolesTurns;
