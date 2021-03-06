import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { reducers } from "./reducers/reducers";
import store from "./store/configureStore";

ReactDOM.render(
  <div style={{ height: "100vh" }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </div>,

  document.getElementById("root")
);
registerServiceWorker();
