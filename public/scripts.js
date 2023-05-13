const socket = io("http://localhost:3000");

const roomNameDiv = document.querySelector("#room-name");
const playerNameDiv = document.querySelector("#player-name");
const playerNameInput = document.querySelector("#player-name-input");
const roomIDInput = document.querySelector("#room-id-input");

const teamGladDiv = document.querySelector("#team-glad-div");
const teamMadDiv = document.querySelector("#team-mad-div");
const teamGlad = document.querySelector("#team-glad");
const teamMad = document.querySelector("#team-mad");

const startButtonsDiv = document.querySelector("#start-buttons");

const newRoomDiv = document.querySelector("#new-room");
const joinRoomDiv = document.querySelector("#join-room");
const startGameDiv = document.querySelector("#start-game");
const nextDiv = document.querySelector("#next");

const hostDiv = document.querySelector("#host");
const poetDiv = document.querySelector("#poetWho");
const roleDiv = document.querySelector("#role");

const gameDiv = document.querySelector("#game");
const gameEndDiv = document.querySelector("#game-end");

let playerName = "";

function hideStartJoinGame() {
  startButtonsDiv.style.display = "none";
  gameDiv.style.display = "block";
}
