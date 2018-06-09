import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import { BrowserRouter } from "react-router-dom";
import { reducers } from "./reducers/reducers";
import { applyMiddleware } from "redux";
import socketEvents from "./middleware/socket";
import logger from "redux-logger";

// const composeEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, applyMiddleware(logger, socketEvents));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
