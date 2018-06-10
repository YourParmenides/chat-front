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

const newMessages = (state = messages, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      return [...state, action.message];
      break;
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
    default:
      return state;
  }
};
//export
export const reducers = combineReducers({
  usersList: usersList,
  messages: newMessages,
  userLogged
});
