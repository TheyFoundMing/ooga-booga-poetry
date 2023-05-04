class Game {
  constructor() {
    this.teamGlad = {};
    this.teamMad = {};
    this.gladPoints = 0;
    this.madPoints = 0;
  }

  addToGlad(playerID, playerName) {
    this.teamGlad[playerID] = playerName;
  }

  addToMad(playerID, playerName) {
    this.teamMad[playerID] = playerName;
  }

  popFromGlad(playerID, playerName) {
    delete this.teamGlad[playerID];
  }

  popFromMad(playerID, playerName) {
    delete this.teamMad[playerID];
  }

  getGladPlayers() {
    return Object.values(this.teamGlad);
  }

  getMadPlayers() {
    return Object.values(this.teamGlad);
  }

  getPlayerCount() {
    return (
      Object.values(this.teamGlad).length + Object.values(this.teamGlad).length
    );
  }
}
