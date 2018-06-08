import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LogIn from "./containers/logInScreen";
import ChatRooms from "./containers/chatRooms";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LogIn} />
          <Route exact path="/chatrooms" component={ChatRooms} />
          <Route path="/chatrooms/:user" component={ChatRooms} />
          <Route render={() => <h1>Page not found</h1>} />
        </div>
      </Router>
    );
  }
}

export default App;
