function hideStartJoinGame() {
  startButtonsDiv.style.display = "none";
  gameDiv.style.display = "flex";
  landingDiv.style.display = "none";
}

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
