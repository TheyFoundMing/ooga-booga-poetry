class Room {
  constructor(roomId, playerMax = 4) {
    this.roomID = roomId;
    this.playerMax = playerMax;
    this.playerCount = 0;
    this.round = {};
  }

  isRoomFull() {
    if (this.playerCount >= this.playerMax) {
      return true;
    } else {
      return false;
    }
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
}

module.exports = Room;
