function nextPoetTurn(io, currentRoom) {
  if (currentRoom.round.hasGameEnded()) {
    io.to(currentRoom.roomID).emit(
      "gameEnd",
      currentRoom.scoreboard.declareWinner()
    );
  } else {
    const { poetName, poetID, poetTeam } = currentRoom.round.pickPoet();
    io.to(currentRoom.roomID).emit("neanderthalPoet", poetName);
    io.to(currentRoom.roomID).emit("poetTurns", currentRoom.round.getTurns());

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

module.exports = nextPoetTurn;
