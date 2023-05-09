socket.on("connect", () => {
  console.log("Successfully connected to the server");
  //   playerName = window.prompt("Please enter your name", "Neanderthal");
  playerName = "Neanderthal";
});

socket.on("playerDefaultName", (name) => {
  playerName = name;
  playerNameDiv.innerHTML = name;
});

socket.on("roomData", (data) => {
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

socket.on("neanderthalPoet", (poetName) => {
  poetDiv.innerHTML = `${poetName} is the poet!`;
});

socket.on("poetYou", (poetName) => {
  roleDiv.innerHTML = `You are the poet!`;
});

socket.on("manWithStick", () => {
  roleDiv.innerHTML = "Your team is the men with stick!";
});
socket.on("humanGuesser", () => {
  roleDiv.innerHTML = "Guess what your Neanderthal teammate is saying!";
});

socket.on("gameEnd", () => {
  gameDiv.style.display = "none";
  gameEndDiv.style.display = "block";
});
