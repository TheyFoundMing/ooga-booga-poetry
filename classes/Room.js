const Round = require("./Round.js");
const Timer = require("./Timer");
const Scoreboard = require("./Scoreboard.js");

// Room essentially holds all the important information to carry over to other functions
class Room {
  constructor(roomId, playerMax = 4) {
    this.roomID = roomId;
    this.playerMax = playerMax;
    this.playerCount = 0;
    this.round = new Round();
    this.timer = new Timer();
    this.scoreboard = new Scoreboard();
    this.host = "";
  }

  isRoomFull() {
    if (this.playerCount >= this.playerMax) {
      return true;
    } else {
      return false;
    }
  }

  //   returns only the names of players
  getGladPlayers() {
    return Object.values(this.round.getGladPlayers());
  }
  //   returns only the names of players
  getMadPlayers() {
    return Object.values(this.round.getMadPlayers());
  }

  changeRound(round) {
    this.round = round;
  }

  increasePlayerCount() {
    this.playerCount += 1;
  }

  decreasePlayerCount() {
    this.playerCount -= 1;
  }

  assignHost(socketID) {
    this.host = socketID;
  }
}

module.exports = Room;
