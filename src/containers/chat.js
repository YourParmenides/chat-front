//import elements
import React, { Component } from "react";
import Message from "../components/message";

//component with specific chat and all messages send and received (list)
class Chat extends Component {
  render() {
    return (
      <div className="chat">
        <Message />
      </div>
    );
  }
}

//export
export default Chat;
