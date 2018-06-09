//import
import { combineReducers } from "redux";
//user events storage (empty on initial)
const users = { users: [] };
const messages = [];

//reducers
const usersList = (state = users, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        users: action.dataResponse
      };
    default:
      return state;
  }
};

const messageReducer = (state = messages, action) => {
  switch (action.type) {
    case "SEND_MESSAGE_SUCCES":
      console.log([...state, action.payload], 555);
      return [...state, action.payload];
    default:
      return state;
  }
};
const userLoggedIn = { username: "", language: "" };
const userLogged = (state = userLoggedIn, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        userLoggedIn: action.userinfo
      };
      break;
    default:
      return state;
  }
};
//export
export const reducers = combineReducers({
  usersList: usersList,
  messages: messageReducer,
  userLogged
});
