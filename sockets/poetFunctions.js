function poetFunctions(io, socket, currentRoom) {
  // these events are for the actual in-game playthrough

  socket.on("1point", () => {
    if (currentRoom.round.currentPoetTeam == "glad") {
      currentRoom.scoreboard.addGladOnePoint();
    } else {
      currentRoom.scoreboard.addMadOnePoint();
    }

    io.to(currentRoom.roomID).emit(
      "scoreboard",
      currentRoom.scoreboard.getScoreboard()
    );
  });

  socket.on("3points", () => {
    if (currentRoom.round.currentPoetTeam == "glad") {
      currentRoom.scoreboard.addGladThreePoints();
    } else {
      currentRoom.scoreboard.addMadThreePoints();
    }

    io.to(currentRoom.roomID).emit(
      "scoreboard",
      currentRoom.scoreboard.getScoreboard()
    );
  });

  socket.on("bonked", () => {
    currentRoom.timer.pauseTimer();
    io.to(currentRoom.roomID).emit("poetBonked");
    io.to(currentRoom.round.currentPoet).emit("youBonked");
  });

  //   event only after getting bonked, moving onto the next card within the round
  socket.on("continue", () => {
    currentRoom.timer.resumeTimer();
    io.to(currentRoom.roomID).emit("continue");
  });
  socket.on("skipCard", () => {});
}

function changeCard() {}

module.exports = poetFunctions;
