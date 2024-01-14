function disconnectPlayers(io, socket, currentRoom) {
  socket.on("disconnect", (reason) => {
    try {
      currentRoom.decreasePlayerCount();
      currentRoom.round.disconnectPlayer(socket.id);
      io.to(currentRoom.roomID).emit("roomData", {
        gladPlayers: currentRoom.getGladPlayers(),
        madPlayers: currentRoom.getMadPlayers(),
        roomID: currentRoom.roomID,
      });
    } catch (err) {
      console.log(err);
    }
  });
}
