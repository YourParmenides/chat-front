//import elements
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router";
import { joinRoom, newMessages } from "../actions/actions";
import { Layout } from "antd";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");
const { Header, Content, Footer } = Layout;

// create single chat room with user language and onclick redirect to a chat

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputvalue: "",
      messages: "",
      sended: false
    };
  }

  componentDidUpdate() {
    if (this.props.user) {
      const id = this.uniqueIdCreator();
      console.log(id);
      // this.props.joinRoom(id);
    }
  }

  uniqueIdCreator = () => {
    const me = this.props.userLogged.username;
    const other = this.props.user;
    const both = me > other ? `${other}--v--${me}` : `${me}--v--${other}`;
    return both;
  };

  // uniqueId = () => {
  //   const id = this.uniqueIdCreator();
  // };

  //send the message ant key 13
  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.allMessages();
      const id = this.uniqueIdCreator();
      socket.emit(
        "NEW_MESSAGE",
        id,
        this.state.inputvalue,
        this.props.userLogged.username
      );
    }
  };

  handleChange = e => {
    this.setState({
      inputvalue: e.target.value
    });
  };

  allMessages = () => {
    socket.on("text", message => {
      this.props.newMessages(message);
      console.log(message, "MESSAGE repetidos????");
    });
  };

  appendMessages = () => {
    console.log(this.props, "props");
    return this.props.messages.map(e => {
      return <p>{e}</p>;
    });
  };

  render() {
    return (
      <div className="chatRoom">
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            {this.props.user}
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div className="content-layout">{this.appendMessages()}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <div className="footer">
              <input onKeyUp={this.handleKeyUp} onChange={this.handleChange} />
            </div>
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    users: state.usersList,
    userLogged: state.userLogged.userLoggedIn
  };
};

const mapDispatchToProps = dispatch => ({
  joinRoom: roomID => dispatch(joinRoom(roomID)),
  newMessages: message => dispatch(newMessages(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
