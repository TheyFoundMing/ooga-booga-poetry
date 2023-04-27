const socket = io("http://localhost:3000");

const playersDiv = document.querySelector("#players");
const roomNameDiv = document.querySelector("#room-name");
const newRoomDiv = document.querySelector("#new-room");
const joinRoomDiv = document.querySelector("#join-room");

let playerName = "";

socket.on("connect", () => {
  console.log("Successfully connected to the server");
  //   playerName = window.prompt("Please enter your name", "Neanderthal");
  playerName = "Neanderthal";
  //   socket.emit("playerJoined", playerName);
  //   console.log(socket.id);
});

socket.on("roomData", (data) => {
  playersDiv.innerHTML = "";
  console.log(data);
  roomNameDiv.innerHTML = `Room ${data.roomID}`;
  if (data.players.length > 0) {
    data.players.forEach((player) => {
      playersDiv.innerHTML += `<li>${player}</li>`;
    });
  }
});

newRoomDiv.addEventListener("click", (e) => {
  const playerCount = window.prompt("How many players are playing?", 4);
  socket.emit("newGame", {
    playerMax: parseInt(playerCount),
    playerName: playerName,
  });
});

joinRoomDiv.addEventListener("click", (e) => {
  const roomID = window.prompt("Enter room ID:");
  socket.emit("joinGame", {
    playerName: playerName,
    roomID: roomID,
  });
});

socket.on("roomFull", () => {
  alert("The room you are trying to join is currently full!");
});
