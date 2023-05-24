class Scoreboard {
  constructor() {
    this.gladPoints = {
      threePoints: 0,
      onePoint: 0,
      oopsPoint: 0,
    };
    this.madPoints = {
      threePoints: 0,
      onePoint: 0,
      oopsPoint: 0,
    };
  }

  addGladThreePoints() {
    this.gladPoints.threePoints += 1;
  }
  addGladOnePoint() {
    this.gladPoints.onePoint += 1;
  }

  addGladOopsPoint() {
    this.gladPoints.oopsPoint += 1;
  }

  addMadThreePoints() {
    this.madPoints.threePoints += 1;
  }
  addMadOnePoint() {
    this.madPoints.onePoint += 1;
  }

  addMadOopsPoint() {
    this.madPoints.oopsPoint += 1;
  }

  getScoreboard() {
    let gladPointsTotal =
      this.gladPoints.threePoints * 3 +
      this.gladPoints.onePoint -
      this.gladPoints.oopsPoint;

    let madPointsTotal =
      this.madPoints.threePoints * 3 +
      this.madPoints.onePoint -
      this.madPoints.oopsPoint;

    return { glad: gladPointsTotal, mad: madPointsTotal };
  }

  declareWinner() {
    let gladPointsTotal =
      this.gladPoints.threePoints * 3 +
      this.gladPoints.onePoint -
      this.gladPoints.oopsPoint;

    let madPointsTotal =
      this.madPoints.threePoints * 3 +
      this.madPoints.onePoint -
      this.madPoints.oopsPoint;

    if (gladPointsTotal > madPointsTotal) {
      return "glad";
    } else if (gladPointsTotal < madPointsTotal) {
      return "mad";
    } else {
      return "tie";
    }
  }
}

module.exports = Scoreboard;
