newRoomDiv.addEventListener("click", (e) => {
  const playerCount = window.prompt("How many players are playing?", 4);
  // in case user clicks cancel on prompt
  if (playerCount) {
    socket.emit("newGame", {
      playerMax: parseInt(playerCount),
      playerName: playerName,
    });
    hideStartJoinGame();
  }
});

joinRoomDiv.addEventListener("click", (e) => {
  const roomID = window.prompt("Enter room ID:");
  socket.emit(
    "joinGame",
    {
      playerName: playerName,
      roomID: roomID,
    },
    hideStartJoinGame
  );
});

teamGladDiv.addEventListener("click", (e) => {
  socket.emit("joinGlad", playerName);
});

teamMadDiv.addEventListener("click", (e) => {
  socket.emit("joinMad", playerName);
});

startGameDiv.addEventListener("click", (e) => {
  socket.emit("startGame");
});

nextDiv.addEventListener("click", (e) => {
  socket.emit("nextTurn");
});
