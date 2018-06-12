import React, { Component } from "react";
import { Input, Button, Select } from "antd";
import { Redirect } from "react-router";
import languages from "./languages";
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
  };

  checkUser = () => {
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
