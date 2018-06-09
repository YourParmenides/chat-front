export const getUsers = dataResponse => ({
  type: "GET_USERS",
  dataResponse
});

export const socket = () => ({
  type: "SOCKET_CONNECT"
});

export const userLogged = userinfo => ({
  type: "LOGGED_IN",
  userinfo
});

export const sendMessages = payload => {
  console.log(payload, 666);
  return {
    type: "SEND_MESSAGE_SUCCES",
    payload: {
      message: payload.message,
      user: payload.user
    }
  };
};
