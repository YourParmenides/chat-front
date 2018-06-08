// //import elements
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUsers } from "../actions/actions";
// import { allUsers } from "../components/message";
import ChatRoom from "../components/chatRoom";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;

//main component of chat, fetch users and render them to user list, add component of chat and userlist,
//route each user to a specific chat

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.getUsers();
    console.log(props, "XXXX");
  }

  getUsers = () => {
    fetch("http://localhost:8000/users")
      .then(data => data.json())
      .then(dataResponse => this.props.getUsers(dataResponse))
      .then(x => console.log(x));
  };

  allUsers = () => {
    return this.props.usersList.map(e => {
      return (
        <Menu.Item key={e.id} className="fadeInDown">
          <Link to={`/chatrooms/${e.username}`}>
            <Icon type="user" />
            <span className="nav-text">{e.username}</span>
          </Link>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <Layout className="father-layout">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            className="menu"
          >
            {this.allUsers()}
          </Menu>
        </Sider>
        <ChatRoom user={this.props.match.params.user} />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  usersList: state.usersList.users
});

const mapDispatchToProps = dispatch => ({
  getUsers: dataResponse => dispatch(getUsers(dataResponse))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms);
