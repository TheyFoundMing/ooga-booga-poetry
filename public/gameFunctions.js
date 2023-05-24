const joinGladFunc = (e) => {
  socket.emit("joinGlad", playerName);
};

const joinMadFunc = (e) => {
  socket.emit("joinMad", playerName);
};

teamGladDiv.addEventListener("click", joinGladFunc);
teamMadDiv.addEventListener("click", joinMadFunc);

socket.on("gameEnd", (winner) => {
  gameDiv.style.display = "none";
  gameEndDiv.style.display = "block";
  if (winner == "glad") {
    gameEndDiv.innerHTML = "Team Glad wins!!!!";
  } else if (winner == "mad") {
    gameEndDiv.innerHTML = "Team Mad wins!!!!";
  } else {
    gameEndDiv.innerHTML = "It's a tie!!!";
  }
});

socket.on("timer", (seconds) => {
  timerDiv.innerHTML = seconds;
});

socket.on("scoreboard", (scoreboard) => {
  gladScoreDiv.innerHTML = `${scoreboard.glad} pts`;
  madScoreDiv.innerHTML = `${scoreboard.mad} pts`;
});

socket.on("cardDetails", (cardDetails) => {
  onePointDiv.innerHTML = `<h3 class="m-0">${cardDetails.one_point}</h3>1pt`;
  threePointsDiv.innerHTML = `<h3 class="m-0">${cardDetails.three_points}</h3>3pt`;
});
