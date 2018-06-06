import { createStore, applyMiddleware, compose } from "redux";
import { middleware } from "../navigation";
import { reducers } from "../reducers/index";

const store = createStore(reducers, applyMiddleware(middleware));

export default store;
