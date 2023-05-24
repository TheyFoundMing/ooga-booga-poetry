const onePointFunc = (e) => {
  socket.emit("1point");
};

const threePointFunc = (e) => {
  socket.emit("3points");
};

const skipFunc = (e) => {
  socket.emit("skipCard");
};

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
  skipButton.removeEventListener("click", skipFunc);
  resumeButton.style.display = "inline-block";
  waitButton.style.display = "none";
});

resumeButton.addEventListener("click", (e) => {
  socket.emit("resumeRound");
  onePointDiv.addEventListener("click", onePointFunc);
  threePointsDiv.addEventListener("click", threePointFunc);
  skipButton.addEventListener("click", skipFunc);
  waitButton.style.display = "inline-block";
  resumeButton.style.display = "none";
});

onePointDiv.addEventListener("click", onePointFunc);
threePointsDiv.addEventListener("click", threePointFunc);

continueButton.addEventListener("click", (e) => {
  socket.emit("continue");
  neanderthalPoetButtonsDiv.style.display = "flex";
  cardDiv.style.display = "block";
  continueButton.style.display = "none";
});

skipButton.addEventListener("click", skipFunc);

socket.on("poetYou", (poetName) => {
  poetDiv.innerHTML = "";
  roleDiv.innerHTML = `You are the poet!`;
  menWithSticksButtonsDiv.style.display = "none";
  startRoundButton.style.display = "block";
});

socket.on("startRound", () => {
  bonkButton.addEventListener("click", bonkFunc);
});

socket.on("waitRound", () => {
  pauseDiv.style.display = "block";
  bonkButton.removeEventListener("click", bonkFunc);
});

socket.on("resumeRound", () => {
  pauseDiv.style.display = "none";
  bonkButton.addEventListener("click", bonkFunc);
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
