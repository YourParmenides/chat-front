//import elements
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router";
import { sendMessages } from "../actions/actions";
import { Form, Layout, Icon, Input, Button } from "antd";
const { Header, Content, Footer } = Layout;

// create single chat room with user language and onclick redirect to a chat

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputvalue: ""
    };
  }

  handleChange = event => {
    this.setState({
      inputvalue: event.target.value
    });
  };
  submitMessage = () => {
    const payload = { user: this.props.user, message: this.state.inputvalue };
    this.props.sendMessages(payload);
  };

  allMessages = () => {
    return this.props.messages.map(e => {
      if (e.user === this.props.user) {
        return (
          <div key={e.id}>
            <p>{e.message}</p>
          </div>
        );
      }
      return;
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
            <div className="content-layout">{this.allMessages()}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <div className="footer">
              <Input
                type="text"
                onChange={this.handleChange}
                // onSubmit={this.submitMessage}
              />
              <Button
                type="primary"
                shape="circle"
                onClick={this.submitMessage}
              >
                <Icon type="right" />
              </Button>
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
    users: state.usersList
  };
};

const mapDispatchToProps = dispatch => ({
  sendMessages: data => dispatch(sendMessages(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

//export
//export default ChatRoom;
