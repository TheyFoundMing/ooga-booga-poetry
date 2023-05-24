const bonkFunc = (e) => {
  socket.emit("bonked");
};

bonkButton.addEventListener("click", bonkFunc);

socket.on("startGame", () => {
  gameViewDiv.style.display = "flex";
  startGameDiv.style.display = "none";
  startNote.style.display = "none";
});

socket.on("neanderthalPoet", (poetName) => {
  poetDiv.innerHTML = `${poetName} is the poet!`;
});

socket.on("manWithStick", () => {
  bonkButton.removeEventListener("click", bonkFunc);
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

socket.on("poetBonked", (bonkerName) => {
  bonkButton.removeEventListener("click", bonkFunc);
  bonkedDiv.innerHTML = `${bonkerName} bonked the poet!`;
});
