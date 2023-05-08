const socket = io("http://localhost:3000");

const roomNameDiv = document.querySelector("#room-name");

const teamGladDiv = document.querySelector("#team-glad-div");
const teamMadDiv = document.querySelector("#team-mad-div");
const teamGlad = document.querySelector("#team-glad");
const teamMad = document.querySelector("#team-mad");

const newRoomDiv = document.querySelector("#new-room");
const joinRoomDiv = document.querySelector("#join-room");
const startGameDiv = document.querySelector("#start-game");

let playerName = "";

socket.on("connect", () => {
  console.log("Successfully connected to the server");
  //   playerName = window.prompt("Please enter your name", "Neanderthal");
  playerName = "Neanderthal";
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

socket.on("roomFull", () => {
  alert("The room you are trying to join is currently full!");
});

socket.on("roomNone", () => {
  alert("The room you are trying to join doesn't exist!");
});

function hideStartJoinGame() {
  newRoomDiv.style.display = "none";
  joinRoomDiv.style.display = "none";
  startGameDiv.style.display = "block";
  teamGladDiv.style.display = "block";
  teamMadDiv.style.display = "block";
}

teamGladDiv.addEventListener("click", (e) => {
  socket.emit("joinGlad", playerName);
});

teamMadDiv.addEventListener("click", (e) => {
  socket.emit("joinMad", playerName);
});

startGameDiv.addEventListener("click", (e) => {
  socket.emit("startGame");
});
