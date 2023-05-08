class Round {
  constructor() {
    this.teamGlad = {};
    this.teamMad = {};
    this.gladPoints = 0;
    this.madPoints = 0;
    this.turns = [];
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

  // returns the dictionary with both the socketID and names
  getGladPlayers() {
    return this.teamGlad;
  }

  getMadPlayers() {
    return this.teamMad;
  }

  getPlayerCount() {
    return (
      Object.values(this.teamGlad).length + Object.values(this.teamGlad).length
    );
  }

  formTurns() {
    const gladPlayers = Object.keys(this.teamGlad);
    const madPlayers = Object.keys(this.teamMad);

    while (gladPlayers & madPlayers) {
      this.turns.push((gladPlayers.shift(), "glad"));
      this.turns.push((madPlayers.shift(), "mad"));
    }

    if (gladPlayers) {
      this.turns.concat(gladPlayers);
    }
  }

  pickPoet() {
    return this.turns.shift();
  }

  hasGameEnded() {
    return this.turns.length > 0;
  }
}

module.exports = Round;
