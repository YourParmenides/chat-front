//imports
import React, { Component } from "react";
import LogInInputs from "../components/logininputs";
import "../App.css";
import { connect } from "react-redux";
import { userLogged } from "../actions/actions";
//main screen, import component add title
class LogIn extends Component {
  render() {
    return (
      <div className="logIn">
        <p id="title">Working Title</p>
        <LogInInputs user={{ ...this.props }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLogged: state.userLogged
});

const mapDispatchToProps = dispatch => ({
  userLogged: dataResponse => dispatch(userLogged(dataResponse))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
