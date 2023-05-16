// assign roles, handles the game's rounds and turns

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

// supporting function
function nextPoetTurn(io, currentRoom) {
  if (currentRoom.round.hasGameEnded()) {
    io.to(currentRoom.roomID).emit("gameEnd");
  } else {
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
      Object.keys(currentRoom.round.getMadPlayers()).forEach((player) => {
        if (player != poetID) {
          io.to(player).emit("humanGuesser");
        }
      });
      Object.keys(currentRoom.round.getGladPlayers()).forEach((player) => {
        io.to(player).emit("manWithStick");
      });
    }

    io.to(poetID).emit("poetYou");
  }
}

module.exports = assignRolesTurns;
