class Room {
  constructor(roomId, playerMax = 4) {
    this.roomID = roomId;
    this.playerMax = playerMax;
    this.players = {};
  }

  // currently uses socket IDs as player IDs
  addPlayer(playerID, playerName) {
    this.players[playerID] = playerName;
  }

  // currently uses socket IDs as player IDs
  deletePlayer(playerID) {
    delete this.players[playerID];
  }

  getPlayers() {
    return Object.values(this.players);
  }

  isRoomFull() {
    if (Object.keys(this.players).length >= this.playerMax) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Room;
