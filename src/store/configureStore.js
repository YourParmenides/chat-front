import { createStore } from "redux";
import { reducers } from "../reducers/reducers";
import logger from "redux-logger";
import socketEvents from "../middleware/socket";
import { applyMiddleware } from "redux";

import { loadState, saveState } from "./localStorageHelper";

const store = createStore(
  reducers,
  loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  // applyMiddleware(logger, socketEvents)
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
