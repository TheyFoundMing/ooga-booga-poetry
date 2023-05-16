class Timer {
  constructor() {
    this.timerID = 0;
    this.seconds = 0;
    this.io = "";
    this.currentRoom = "";
    this.callback = () => {};
  }

  startTimer(io, currentRoom, callback) {
    this.seconds = 20;
    this.timerID = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds -= 1;
        io.to(currentRoom.roomID).emit("timer", this.seconds);
      } else {
        callback(io, currentRoom);
        clearInterval(this.timerID);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerID);
  }

  resumeTimer(io, currentRoom, callback) {
    this.timerID = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds -= 1;
        io.to(currentRoom.roomID).emit("timer", this.seconds);
      } else {
        callback(io, currentRoom);
        clearInterval(this.timerID);
      }
    }, 1000);
  }
}

module.exports = Timer;
