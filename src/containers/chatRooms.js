// //import elements
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers, joinRoom } from "../actions/actions";
import ChatRoom from "../components/chatRoom";
import { Layout, Menu, Icon } from "antd";
import "../App.css";
import "../animate.css";
import icon1 from "../assets/icons/001.png";
import icon2 from "../assets/icons/002.png";
import icon3 from "../assets/icons/003.png";
import icon4 from "../assets/icons/004.png";
import icon5 from "../assets/icons/005.png";
import icon6 from "../assets/icons/006.png";
import icon7 from "../assets/icons/007.png";
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

  // number = () => {
  //   if (this.props.match.params.user === "Carlos") return icon1;
  //   let arr = [icon2, icon3, icon4, icon5, icon6, icon7];
  //   let result = arr[Math.floor(Math.random() * 5)];
  //   return (
  //     <img
  //       src={result}
  //       width={24}
  //       height={24}
  //       style={{ marginBottom: "10px", marginLeft: "10px" }}
  //     />
  //   );
  // };

  // this.props.match.params.user
  allUsers = () => {
    return this.props.usersList.map(e => {
      if (e.username !== this.props.userLogged.username) {
        return (
          <Menu.Item key={e.id} className="fadeInDown" ref="menuitem">
            <Link to={`/chatrooms/${e.username}`}>
              <img src={icon4} />
              <span className="userTitle">{e.username}</span>
            </Link>
          </Menu.Item>
        );
      }
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
