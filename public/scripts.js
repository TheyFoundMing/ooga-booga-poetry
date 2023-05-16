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
const startNote = document.querySelector("#start-note");

const newRoomDiv = document.querySelector("#new-room");
const joinRoomDiv = document.querySelector("#join-room");
const startGameDiv = document.querySelector("#start-game");
const startRoundButton = document.querySelector("#start-round");

const hostDiv = document.querySelector("#host");
const poetDiv = document.querySelector("#poetWho");
const roleDiv = document.querySelector("#role");

const gameDiv = document.querySelector("#game");
const gameViewDiv = document.querySelector("#game-view");
const gameEndDiv = document.querySelector("#game-end");

const landingDiv = document.querySelector("#landing-intro");
const menWithSticksButtonsDiv = document.querySelector("#men-with-sticks");
const neanderthalPoetButtonsDiv = document.querySelector("#neanderthal-poet");

const cardDiv = document.querySelector("#card");
const timerDiv = document.querySelector("#timer");

const waitButton = document.querySelector("#wait");
const resumeButton = document.querySelector("#resume");
const pauseDiv = document.querySelector("#paused");

let playerName = "";

function hideStartJoinGame() {
  startButtonsDiv.style.display = "none";
  gameDiv.style.display = "flex";
  landingDiv.style.display = "none";
}
