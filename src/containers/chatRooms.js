// //import elements
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers, joinRoom } from "../actions/actions";
import ChatRoom from "../components/chatRoom";
import { Layout, Menu, Icon } from "antd";
import "../App.css";
import "../animate.css";
const { Sider } = Layout;
//main component of chat, fetch users and render them to user list, add component of chat and userlist,
//route each user to a specific chat

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.getUsers();
  }

  getUsers = () => {
    fetch("http://localhost:8000/users")
      .then(data => data.json())
      .then(dataResponse => this.props.getUsers(dataResponse));
  };

  // this.props.match.params.user
  allUsers = () => {
    return this.props.usersList.map(e => {
      if (e.username !== this.props.userLogged.username) {
        return (
          <Menu.Item key={e.id} className="fadeInDown" ref="menuitem">
            <Link to={`/chatrooms/${e.username}`}>
              <Icon type="user" className="icon" />
              <span className="nav-text">{e.username}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  };
  //
  // socketConnect = () => {
  //   const socket = io.connect("http://localhost:8000");
  // };

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
            // onClick={this.socketConnectrs}
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
  userLogged: state.userLogged.userLoggedIn
});

const mapDispatchToProps = dispatch => ({
  getUsers: dataResponse => dispatch(getUsers(dataResponse)),
  joinRoom: roomID => dispatch(joinRoom(roomID))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms);
