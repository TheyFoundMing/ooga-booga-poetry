socket.on("connect", () => {
  console.log("Successfully connected to the server");
  //   playerName = window.prompt("Please enter your name", "Neanderthal");
  playerName = "Neanderthal";
});

socket.on("playerDefaultName", (name) => {
  playerName = name;
  playerNameInput.value = name;
});

socket.on("roomData", (data) => {
  roomNameDiv.style.display = "block";
  roomNameDiv.innerHTML = `Room ${data.roomID}`;
  teamMad.innerHTML = "";
  teamGlad.innerHTML = "";

  if (data.madPlayers.length > 0) {
    data.madPlayers.forEach((player) => {
      teamMad.innerHTML += `<li>${player}</li>`;
    });
  }

  if (data.gladPlayers.length > 0) {
    data.gladPlayers.forEach((player) => {
      teamGlad.innerHTML += `<li>${player}</li>`;
    });
  }
});

socket.on("roomFull", () => {
  alert("The room you are trying to join is currently full!");
});

socket.on("roomNone", () => {
  alert("The room you are trying to join doesn't exist!");
});

socket.on("host", () => {
  hostDiv.style.display = "block";
});

socket.on("startGame", () => {
  gameViewDiv.style.display = "flex";
  startGameDiv.style.display = "none";
  startNote.style.display = "none";
});

socket.on("neanderthalPoet", (poetName) => {
  poetDiv.innerHTML = `${poetName} is the poet!`;
});

socket.on("poetYou", (poetName) => {
  roleDiv.innerHTML = `You are the poet!`;
  neanderthalPoetButtonsDiv.style.display = "flex";
  menWithSticksButtonsDiv.style.display = "none";
  cardDiv.style.display = "block";
  startRoundButton.style.display = "block";
});

socket.on("manWithStick", () => {
  roleDiv.innerHTML = "Your team is the men with stick!";
  menWithSticksButtonsDiv.style.display = "flex";
  neanderthalPoetButtonsDiv.style.display = "none";
  cardDiv.style.display = "block";
  startRoundButton.style.display = "none";
});
socket.on("humanGuesser", () => {
  roleDiv.innerHTML = "Guess what your Neanderthal teammate is saying!";
  neanderthalPoetButtonsDiv.style.display = "none";
  menWithSticksButtonsDiv.style.display = "none";
  cardDiv.style.display = "none";
  startRoundButton.style.display = "none";
});

socket.on("gameEnd", () => {
  gameDiv.style.display = "none";
  gameEndDiv.style.display = "block";
});

socket.on("timer", (seconds) => {
  timerDiv.innerHTML = seconds;
});

socket.on("waitRound", () => {
  pauseDiv.style.display = "block";
});

socket.on("resumeRound", () => {
  pauseDiv.style.display = "none";
});
