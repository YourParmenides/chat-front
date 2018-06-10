import io from "socket.io-client";

export default store => {
  let socket;
  const connect = data => {
    socket = io.connect("http://localhost:8000");
    socket.emit("SOCKET_CONNECT", data);
    socket.on("ACTION", action => {
      store.dispatch(action);
    });
  };

  const joinRoom = roomID => {
    socket.emit("JOIN_ROOM", roomID);
  };

  // const disconnect = data => {
  //   socket.emit("SOCKET_DISCONNECT", data);
  //   socket.disconnect();
  // };

  const newMessage = message => {
    socket.emit("NEW_MESSAGE", message);
  };

  return next => action => {
    switch (action.type) {
      case "SOCKET_CONNECT":
        connect(action.room);
        break;
      case "JOIN_ROOM":
        joinRoom(action.roomID);
        break;
      default:
    }

    next(action);
  };
};
