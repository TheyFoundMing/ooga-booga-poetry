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
  poetDiv.innerHTML = "";
  roleDiv.innerHTML = `You are the poet!`;
  menWithSticksButtonsDiv.style.display = "none";
  startRoundButton.style.display = "block";
});

socket.on("manWithStick", () => {
  roleDiv.innerHTML = "Your team is the men with stick!";
  menWithSticksButtonsDiv.style.display = "flex";
  neanderthalPoetButtonsDiv.style.display = "none";
  cardDiv.style.display = "none";
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
  bonkButton.removeEventListener("click", bonkFunc);
});

socket.on("resumeRound", () => {
  pauseDiv.style.display = "none";
  bonkButton.addEventListener("click", bonkFunc);
});

socket.on("scoreboard", (scoreboard) => {
  gladScoreDiv.innerHTML = `${scoreboard.glad} pts`;
  madScoreDiv.innerHTML = `${scoreboard.mad} pts`;
});

socket.on("poetBonked", (bonkerName) => {
  bonkButton.removeEventListener("click", bonkFunc);
  bonkedDiv.innerHTML = `${bonkerName} bonked the poet!`;
});

socket.on("youBonked", (bonkerName) => {
  bonkedDiv.innerHTML = `${bonkerName} bonked you!`;
  neanderthalPoetButtonsDiv.style.display = "none";
  cardDiv.style.display = "none";
  continueButton.style.display = "inline-block";
});

socket.on("continue", () => {
  bonkButton.addEventListener("click", bonkFunc);
  bonkedDiv.innerHTML = "";
});
