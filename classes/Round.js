class Round {
  constructor() {
    this.teamGlad = {};
    this.teamMad = {};
    this.turns = [];
    this.currentPoet = "";
    this.currentPoetTeam = "";
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
    delete this.teamGlad[playerID];
  }

  popFromMad(playerID) {
    delete this.teamMad[playerID];
  }

  // returns the dictionary with both the socketID and names
  getGladPlayers() {
    return this.teamGlad;
  }

  // returns the dictionary with both the socketID and names
  getMadPlayers() {
    return this.teamMad;
  }

  identifyPlayer(playerID) {
    if (playerID in this.teamGlad) {
      return [playerID, this.teamGlad[playerID], "glad"];
    } else if (playerID in this.teamMad) {
      return [playerID, this.teamMad[playerID], "mad"];
    }
  }

  getPlayerCount() {
    return (
      Object.values(this.teamGlad).length + Object.values(this.teamGlad).length
    );
  }

  getTurns() {
    let poets = [];
    this.turns.forEach((player) => {
      console.log(this.identifyPlayer(player[0])[1]);
      poets.push(this.identifyPlayer(player[0])[1]);
    });
    return poets;
  }

  formTurns() {
    const gladPlayers = Object.keys(this.teamGlad);
    const madPlayers = Object.keys(this.teamMad);

    while (gladPlayers.length > 0 && madPlayers.length > 0) {
      this.turns.push([gladPlayers.shift(), "glad"]);
      this.turns.push([madPlayers.shift(), "mad"]);
    }

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
    this.currentPoetTeam = poet[1];

    return {
      poetName: poetName,
      poetID: poet[0],
      poetTeam: poet[1],
    };
  }

  hasGameEnded() {
    return this.turns.length == 0;
  }

  disconnectPlayer(playerID) {
    if (playerID == this.currentPoet) {
      this.playerIsPoetLeave(playerID);
    } else if (this.turns.includes(playerID)) {
      this.playerNotPoetLeave(playerID);
    } else {
      if (playerID in this.teamGlad) {
        this.popFromGlad(playerID);
      } else {
        this.popFromMad(playerID);
      }
    }
  }

  playerIsPoetLeave(playerID) {}

  playerNotPoetLeave(playerID) {}

  replacePlayer(playerID) {}
}

module.exports = Round;
