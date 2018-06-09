// //import elements
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUsers } from "../actions/actions";
// import { allUsers } from "../components/message";
import ChatRoom from "../components/chatRoom";
import { Layout, Menu, Icon } from "antd";
import { socket } from "../actions/actions";
const { Sider } = Layout;
//main component of chat, fetch users and render them to user list, add component of chat and userlist,
//route each user to a specific chat

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.uniqueId();
    this.getUsers();
    this.props.socketConnect();
    this.state = {
      userClicked: ""
    };
  }

  uniqueId = clicked => {
    const one = this.props.userLogged.userLoggedIn.username;
    const two = this.props.match.params.user;
    const three = one > two ? `${two}--v--${one}` : `${one}--v--${two}`;
    console.log(one, two, three, "XXXXX");
    this.props.socketConnect(three);
  };

  getUsers = () => {
    fetch("http://localhost:8000/users")
      .then(data => data.json())
      .then(dataResponse => this.props.getUsers(dataResponse));
  };

  allUsers = () => {
    return this.props.usersList.map(e => {
      return (
        <Menu.Item key={e.id} className="fadeInDown">
          <Link to={`/chatrooms/${e.username}`}>
            <Icon type="user" />
            <span className="nav-text" onClick={this.uniqueId()}>
              {e.username}
            </span>
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
  usersList: state.usersList.users,
  userLogged: state.userLogged
});

const mapDispatchToProps = dispatch => ({
  getUsers: dataResponse => dispatch(getUsers(dataResponse)),
  socketConnect: () => dispatch(socket())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms);
