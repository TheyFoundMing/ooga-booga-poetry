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
        io.to(currentRoom.roomID).emit("gameEnd");
      } else {
        nextPoetTurn(io, currentRoom);
      }
    }
  });

  socket.on("startRound", () => {
    currentRoom.timer.startTimer(io, currentRoom, nextPoetTurn);
  });

  socket.on("waitRound", () => {
    currentRoom.timer.pauseTimer();
    io.to(currentRoom.roomID).emit("waitRound");
  });

  socket.on("resumeRound", () => {
    io.to(currentRoom.roomID).emit("resumeRound");
    currentRoom.timer.resumeTimer(io, currentRoom, nextPoetTurn);
  });
}

module.exports = assignRolesTurns;
