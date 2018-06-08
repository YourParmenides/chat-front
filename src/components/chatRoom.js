//import elements
import React, { Component } from "react";
// import { Redirect } from "react-router";
import { Layout, Icon, Input, Button } from "antd";
const { Header, Content, Footer } = Layout;

// create single chat room with user language and onclick redirect to a chat

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    console.log(this.props, "ZZZ");
  }
  render() {
    return (
      <div className="chatRoom">
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            {this.props.user}
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div className="content-layout" />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <div className="footer">
              <Input style={{ marginRight: "10px" }} />
              <Button type="primary" shape="circle">
                <Icon type="right" />
              </Button>
            </div>
          </Footer>
        </Layout>
      </div>
    );
  }
}

//export
export default ChatRoom;
