// assign roles, handles the game's rounds and turns

function assignRolesTurns(io, socket, currentRoom) {
  socket.on("startGame", () => {
    if (socket.id == currentRoom.host) {
    }
  });
}

module.exports = assignRolesTurns;
