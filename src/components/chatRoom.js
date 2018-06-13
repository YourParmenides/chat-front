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
    if (e.keyCode === 13 && this.state.inputvalue !== "") {
      const id = uniqueId(this.props.userLogged.username, this.props.user);
      socket.emit("NEW_MESSAGE", id, this.state.inputvalue, this.props.user);
      e.target.value = "";
    }
  };

  handleChange = e => {
    this.setState({
      inputvalue: e.target.value
    });
  };

  //time send messages
  formatDate = () => {
    let date = new Date();

    var amOrPm = date.getHours() < 12 ? "am" : "pm";
    var hour = date.getHours() < 12 ? date.getHours() : date.getHours() - 12;
    let time = hour + ":" + date.getMinutes() + " " + amOrPm;
    return <p>{time}</p>;
    // return hour + ":" + date.getMinutes() + " " + amOrPm;
  };

  appendMessages = () => {
    return this.props.message.map(e => {
      if (
        e.rooomID === uniqueId(this.props.userLogged.username, this.props.user)
      ) {
        if (e.user !== this.props.user) {
          return (
            <div className="wholeMessageOther">
              <div className="userInfoOther">
                <i className="dotGreen" />
                <p className="userNameInfo">
                  <b>{this.props.userLogged.username}</b>
                </p>
                {this.formatDate()}
              </div>
              <div className="messageboxother animated zoomIn">
                <p key={Math.random()} className="message-text-other">
                  {e.translated}
                </p>
                {/* <em key={Math.random()} className="message-text-second-other">
                  {e.message}
                </em> */}
              </div>
            </div>
          );
        } else {
          return (
            <div className="wholeMessage">
              <div className="userInfo">
                {this.formatDate()}
                <p className="userNameInfo">{e.user}</p>
                <i className="dotBlue" />
              </div>
              <div className="messagebox animated zoomIn">
                <p key={Math.random()} className="message-text">
                  {e.message}
                </p>
                <em key={Math.random()} className="message-text-second">
                  {`${e.translated} (${e.language})`}
                </em>
              </div>
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
        <div className="contentlayout">{this.appendMessages()}</div>
        <div className="footer">
          <textarea
            className="textarea"
            onKeyUp={this.handleKeyUp}
            onChange={this.handleChange}
          />
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
