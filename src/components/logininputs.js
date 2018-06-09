import React, { Component } from "react";
import { Input, Button } from "antd";
import { Redirect } from "react-router";

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

  checkUser = () => {
    fetch("http://localhost:8000/addUser", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(res => {
      if (res.status === 200 || res.status === 201)
        this.props.user.userLogged(this.state);
      if (res.status === 200) this.setState({ redirect: true });
      if (res.status === 201) this.setState({ redirect: true });
    });
  };

  render() {
    console.log(this.props, "child");
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
          name="password"
          placeholder="password"
          onChange={this.captureInput}
        />
        <Input
          name="language"
          placeholder="language"
          onChange={this.captureInput}
        />
        <Button type="primary" onClick={this.checkUser}>
          Sign in /Sign up
        </Button>
      </div>
    );
  }
}

export default LogInInputs;
