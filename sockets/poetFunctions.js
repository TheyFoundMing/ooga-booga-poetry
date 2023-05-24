const nextPoetTurn = require("./nextPoetTurn");

function poetFunctions(io, socket, currentRoom, con) {
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

    getCard(io, socket, currentRoom, con);
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

    getCard(io, socket, currentRoom, con);
  });

  socket.on("bonked", () => {
    currentRoom.timer.pauseTimer();

    let bonker = "";
    const gladPlayers = currentRoom.round.getGladPlayers();
    const madPlayers = currentRoom.round.getMadPlayers();

    if (socket.id in gladPlayers) {
      bonker = gladPlayers[socket.id];
    } else {
      bonker = madPlayers[socket.id];
    }

    io.to(currentRoom.roomID).emit("poetBonked", bonker);
    io.to(currentRoom.round.currentPoet).emit("youBonked", bonker);
  });

  //   event only after getting bonked, moving onto the next card within the round
  socket.on("continue", () => {
    currentRoom.timer.resumeTimer(io, currentRoom, nextPoetTurn);
    if (currentRoom.round.currentPoetTeam == "glad") {
      currentRoom.scoreboard.addGladOopsPoint();
    } else {
      currentRoom.scoreboard.addMadOopsPoint();
    }
    io.to(currentRoom.roomID).emit("continue");
    io.to(currentRoom.roomID).emit(
      "scoreboard",
      currentRoom.scoreboard.getScoreboard()
    );

    getCard(io, socket, currentRoom, con);
  });

  socket.on("startRound", () => {
    io.to(currentRoom.roomID).emit("startRound");
    currentRoom.timer.startTimer(io, currentRoom, nextPoetTurn);
    getCard(io, socket, currentRoom, con);
  });

  socket.on("waitRound", () => {
    currentRoom.timer.pauseTimer();
    io.to(currentRoom.roomID).emit("waitRound");
  });

  socket.on("resumeRound", () => {
    io.to(currentRoom.roomID).emit("resumeRound");
    currentRoom.timer.resumeTimer(io, currentRoom, nextPoetTurn);
  });

  socket.on("skipCard", () => {
    getCard(io, socket, currentRoom, con);
  });
}

function getCard(io, socket, currentRoom, con) {
  con.query(
    "SELECT * FROM cards ORDER BY RAND() LIMIT 1;",
    function (err, result) {
      if (err) throw err;
      io.to(currentRoom.round.currentPoet).emit("cardDetails", result[0]);
    }
  );
}

module.exports = poetFunctions;
