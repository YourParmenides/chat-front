//import
import { combineReducers } from "redux";
//user events storage (empty on initial)
const users = { users: [] };

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
//export
export const reducers = combineReducers({
  usersList: usersList
});
