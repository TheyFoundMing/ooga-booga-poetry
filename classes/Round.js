class Round {
  constructor() {
    this.teamGlad = {};
    this.teamMad = {};
    this.gladPoints = 0;
    this.madPoints = 0;
  }

  addToGlad(playerID, playerName) {
    if (playerID in this.teamMad) {
      this.popFromMad(playerID);
    }
    this.teamGlad[playerID] = playerName;
  }

  addToMad(playerID, playerName) {
    if (playerID in this.teamGlad) {
      this.popFromGlad(playerID);
    }
    this.teamMad[playerID] = playerName;
  }

  popFromGlad(playerID) {
    console.log("before pop", this.teamGlad);
    delete this.teamGlad[playerID];
    console.log("after pop", this.teamGlad);
  }

  popFromMad(playerID) {
    delete this.teamMad[playerID];
  }

  disconnectPlayer(playerID) {
    if (playerID in this.teamGlad) {
      this.popFromGlad(playerID);
    } else {
      this.popFromMad(playerID);
    }
  }

  getGladPlayers() {
    return Object.values(this.teamGlad);
  }

  getMadPlayers() {
    return Object.values(this.teamMad);
  }

  getPlayerCount() {
    return (
      Object.values(this.teamGlad).length + Object.values(this.teamGlad).length
    );
  }
}

module.exports = Round;
