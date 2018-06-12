//import elements
import React, { Component } from "react";
import { connect } from "react-redux";
import { newMessages } from "../actions/actions";
import { Layout } from "antd";
import io from "socket.io-client";
import "../App.css";
import "../animate.css";
const socket = io.connect("http://localhost:8000");
const { Header, Footer } = Layout;

// create single chat room with user language and onclick redirect to a chat
const uniqueId = (me, other) =>
  me > other ? `${other}--v--${me}` : `${me}--v--${other}`;

const joinRoom = (me, other) => {
  if (me && other) {
    const id = uniqueId(me, other);
    socket.emit("JOIN_ROOM", id);
  }
};

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputvalue: "",
      messages: "",
      sended: false
    };
    this.textListener = payload => {
      props.newMessages(payload);
    };
    socket.on("text", this.textListener);
    if (props.user) joinRoom(props.userLogged.username, props.user);
  }

  componentWillUnmount() {
    socket.off("text", this.textListener);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && prevProps.user !== this.props.user) {
      joinRoom(this.props.userLogged.username, this.props.user);
    }
  }

  //send the message ant key 13
  handleKeyUp = e => {
    if (e.keyCode === 13) {
      const id = uniqueId(this.props.userLogged.username, this.props.user);
      socket.emit("NEW_MESSAGE", id, this.state.inputvalue, this.props.user);
    }
  };

  handleChange = e => {
    this.setState({
      inputvalue: e.target.value
    });
  };

  appendMessages = () => {
    return this.props.message.map(e => {
      if (
        e.rooomID === uniqueId(this.props.userLogged.username, this.props.user)
      ) {
        if (e.user !== this.props.user) {
          return (
            <div className="messageboxother">
              <p key={Math.random()} className="message-text">
                {e.translated}
              </p>
            </div>
          );
        } else {
          return (
            <div className="messagebox">
              <p key={Math.random()} className="message-text">
                {e.message}
              </p>
              <em key={Math.random()} className="message-text">
                {e.translated}
              </em>
            </div>
          );
        }
      }
    });
  };

  render() {
    return (
      <div className="chatRoom">
        <div className="header">{this.props.user}</div>
        <div className="content-layout">{this.appendMessages()}</div>
        <div className="footer">
          <input onKeyUp={this.handleKeyUp} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.messages,
    users: state.usersList,
    userLogged: state.userLogged.userLoggedIn
  };
};

const mapDispatchToProps = dispatch => ({
  // joinRoom: roomID => dispatch(joinRoom(roomID)),
  newMessages: payload => dispatch(newMessages(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
