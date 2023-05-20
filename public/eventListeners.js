const onePointFunc = (e) => {
  socket.emit("1point");
};

const threePointFunc = (e) => {
  socket.emit("3points");
};

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

const joinGladFunc = (e) => {
  socket.emit("joinGlad", playerName);
};

const joinMadFunc = (e) => {
  socket.emit("joinMad", playerName);
};

teamGladDiv.addEventListener("click", joinGladFunc);
teamMadDiv.addEventListener("click", joinMadFunc);

startGameDiv.addEventListener("click", (e) => {
  teamGladDiv.removeEventListener("click", joinGladFunc);
  teamMadDiv.removeEventListener("click", joinMadFunc);
  socket.emit("startGame");
});

startRoundButton.addEventListener("click", (e) => {
  socket.emit("startRound");
  neanderthalPoetButtonsDiv.style.display = "flex";
  cardDiv.style.display = "block";
  startRoundButton.style.display = "none";
});

waitButton.addEventListener("click", (e) => {
  socket.emit("waitRound");
  onePointDiv.removeEventListener("click", onePointFunc);
  threePointsDiv.removeEventListener("click", threePointFunc);
  resumeButton.style.display = "inline-block";
  waitButton.style.display = "none";
});

resumeButton.addEventListener("click", (e) => {
  socket.emit("resumeRound");
  onePointDiv.addEventListener("click", onePointFunc);
  threePointsDiv.addEventListener("click", threePointFunc);
  waitButton.style.display = "inline-block";
  resumeButton.style.display = "none";
});

onePointDiv.addEventListener("click", onePointFunc);
threePointsDiv.addEventListener("click", threePointFunc);
