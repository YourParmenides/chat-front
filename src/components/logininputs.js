import React, { Component } from "react";
import { Input, Button, Select } from "antd";
import { Redirect } from "react-router";
import languages from "./languages";
import icon1 from "../assets/icons/001.png";
import icon2 from "../assets/icons/002.png";
import icon3 from "../assets/icons/003.png";
import icon4 from "../assets/icons/004.png";
import icon5 from "../assets/icons/005.png";
import icon6 from "../assets/icons/006.png";
import icon7 from "../assets/icons/007.png";
const Option = Select.Option;

class LogInInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      password: "",
      language: ""
    };
  }

  captureInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  captureSelected = e => {
    this.setState({
      language: e
    });
    // this.getIcon();
  };

  // getIcon = () => {
  //   console.log(icon1);
  //
  //   if (this.state.username === "Carlos")
  //     return this.setState({
  //       icon: icon1
  //     });
  //
  //   let arr = [icon2, icon3, icon4, icon5, icon6, icon7];
  //   let result = arr[Math.floor(Math.random() * 5)];
  //   console.log(result);
  //   return this.setState({
  //     icon: result
  //   });
  // };

  checkUser = () => {
    // console.log(this.state);
    fetch("http://localhost:8000/addUser", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200 || res.status === 201)
          this.props.user.userLogged(this.state);
        if (res.status === 200) this.setState({ redirect: true });
        if (res.status === 201) this.setState({ redirect: true });
      })
      .catch(err => console.log(err));
  };

  mapAllLanguages = () => {
    return languages.map(e => {
      return <Option value={e}>{e}</Option>;
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/chatrooms" />;
    }

    return (
      <div className="logininputs">
        <Input
          name="username"
          placeholder="username"
          onChange={this.captureInput}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          onChange={this.captureInput}
        />
        <Select
          // mode="tags"
          name="language"
          defaultValue="Choose Language"
          style={{ width: 200, marginTop: 15 }}
          onChange={this.captureSelected}
        >
          {this.mapAllLanguages()}
        </Select>

        <Button type="primary" onClick={this.checkUser}>
          Sign in /Sign up
        </Button>
      </div>
    );
  }
}

export default LogInInputs;
