newRoomDiv.addEventListener("click", (e) => {
  const playerCount = window.prompt("How many players are playing?", 4);
  // needs the player name to not be empty
  if (playerCount) {
    if (playerNameInput.value != "") {
      playerName = playerNameInput.value;
      playerNameDiv.style.display = "block";
      playerNameDiv.innerHTML = playerName;

      socket.emit("newGame", {
        playerMax: parseInt(playerCount),
        playerName: playerName,
      });
      hideStartJoinGame();
    } else {
      alert("Give yourself a name!");
    }
  }
});

joinRoomDiv.addEventListener("click", (e) => {
  //   const roomID = window.prompt("Enter room ID:");
  if (playerNameInput.value != "") {
    playerName = playerNameInput.value;
    playerNameDiv.style.display = "block";
    playerNameDiv.innerHTML = playerName;

    if (roomIDInput.value != "") {
      roomID = roomIDInput.value;

      socket.emit(
        "joinGame",
        {
          playerName: playerName,
          roomID: roomID,
        },
        hideStartJoinGame
      );
    } else {
      socket.emit("newGame", {
        playerMax: 4,
        playerName: playerName,
      });
      hideStartJoinGame();
    }
  } else {
    alert("Give yourself a name!");
  }
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

startRoundButton.addEventListener("click", (e) => {
  socket.emit("startRound");
  startRoundButton.style.display = "none";
});

waitButton.addEventListener("click", (e) => {
  socket.emit("waitRound");
  resumeButton.style.display = "inline-block";
  waitButton.style.display = "none";
});

resumeButton.addEventListener("click", (e) => {
  socket.emit("resumeRound");
  waitButton.style.display = "inline-block";
  resumeButton.style.display = "none";
});
