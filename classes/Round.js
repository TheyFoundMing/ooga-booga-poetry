class Round {
  constructor() {
    this.teamGlad = {};
    this.teamMad = {};
    this.gladPoints = 0;
    this.madPoints = 0;
    this.turns = [];
    this.currentPoet = "";
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

    while (gladPlayers.length > 0 && madPlayers.length > 0) {
      this.turns.push([gladPlayers.shift(), "glad"]);
      this.turns.push([madPlayers.shift(), "mad"]);
    }

    console.log(gladPlayers);

    if (gladPlayers.length > 0) {
      gladPlayers.forEach((player) => {
        this.turns.push([player, "glad"]);
      });
    }

    console.log("turns sequence", this.turns);
  }

  pickPoet() {
    const poet = this.turns.shift();
    let poetName = "";
    if (poet[1] == "glad") {
      poetName = this.teamGlad[poet[0]];
    } else {
      poetName = this.teamMad[poet[0]];
    }

    this.currentPoet = poet[0];

    return {
      poetName: poetName,
      poetID: poet[0],
      poetTeam: poet[1],
    };
  }

  hasGameEnded() {
    return this.turns.length == 0;
  }
}

module.exports = Round;
