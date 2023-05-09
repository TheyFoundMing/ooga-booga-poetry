// assign roles, handles the game's rounds and turns

function assignRolesTurns(io, socket, currentRoom) {
  socket.on("startGame", () => {
    if (socket.id == currentRoom.host) {
      currentRoom.round.formTurns();
      //   const { poetName, poetID, poetTeam } = currentRoom.round.pickPoet();

      //   io.to(currentRoom.roomID).emit("neanderthalPoet", poetName);

      //   if (poetTeam == "glad") {
      //     Object.keys(currentRoom.round.getGladPlayers()).forEach((player) => {
      //       if (player != poetID) {
      //         io.to(player).emit("humanGuesser");
      //       }
      //     });
      //     Object.keys(currentRoom.round.getMadPlayers()).forEach((player) => {
      //       io.to(player).emit("manWithStick");
      //     });
      //   } else {
      //     Object.keys(currentRoom.round.getGladPlayers()).forEach((player) => {
      //       if (player != poetID) {
      //         io.to(player).emit("humanGuesser");
      //       }
      //     });
      //     Object.keys(currentRoom.round.getMadPlayers()).forEach((player) => {
      //       io.to(player).emit("manWithStick");
      //     });
      //   }
      nextPoetTurn(io, currentRoom);
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
}

// supporting function
function nextPoetTurn(io, currentRoom) {
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

  io.to(poetID).emit("poetYou");
}

module.exports = assignRolesTurns;
