const socket = io("http://localhost:3000");

const playersDiv = document.querySelector("#players");
const roomNameDiv = document.querySelector("#room-name");
let playerName = "";

socket.on("connect", () => {
  console.log("Successfully connected to the server");
  playerName = window.prompt("Please enter your name", "Neanderthal");
  //   playerName = "Neanderthal";
  socket.emit("playerJoined", playerName);
  console.log(socket.id);
});

socket.on("roomData", (data) => {
  playersDiv.innerHTML = "";
  console.log(data);
  roomNameDiv.innerHTML = data.roomID;
  data.players.forEach((player) => {
    playersDiv.innerHTML += `<li>${player}</li>`;
  });
});
