//imports
import React, { Component } from "react";
import LogInInputs from "../components/logininputs";
import "../App.css";

//main screen, import component add title
class LogIn extends Component {
  render() {
    return (
      <div className="logIn">
        <p id="title">Working Title</p>
        <LogInInputs />
      </div>
    );
  }
}

export default LogIn;
