import io from "socket.io-client";

export default store => {
  let socket;

  const connect = data => {
    console.log("SSSS");
    socket = io("http://localhost:8000");
    socket.emit("SOCKET_CONNECT");
    socket.on("ACTION", action => {
      store.dispatch(action);
    });
  };

  const disconnect = data => {
    socket.emit("SOCKET_DISCONNECT", data);
    socket.disconnect();
  };

  return next => action => {
    switch (action.type) {
      case "SOCKET_CONNECT":
        connect();
        break;
      default:
    }

    next(action);
  };
};
