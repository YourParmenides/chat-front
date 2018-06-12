export const getUsers = dataResponse => ({
  type: "GET_USERS",
  dataResponse
});

export const socketConnect = room => ({
  type: "SOCKET_CONNECT",
  room
});

export const userLogged = userinfo => ({
  type: "LOGGED_IN",
  userinfo
});

export const joinRoom = roomID => ({
  type: "JOIN_ROOM",
  roomID
});

export const newMessages = payload => ({
  type: "NEW_MESSAGE",
  payload
});
