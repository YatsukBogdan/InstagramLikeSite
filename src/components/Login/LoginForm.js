import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import md5 from 'js-md5';

const LoginForm = React.createClass({
  getInitialState() {
    return {
      logined: 'undefined'
    }
  },
  loginUser(){
    $.post(
      '/login',
    {
      username: document.getElementById('username').value,
      passwordHash: md5(document.getElementById('password').value)
    },
    (data) => {
      if (data.logined) {
        browserHistory.push('/');
      } else {
        this.setState({logined:'error'});
      }
    });
  },
  render() {
    return (
      <section className="login">
          <label>
              Username
              <input type="text" name="username" id="username" />
          </label>
          <label>
              Password
              <input type="password" name="password" id="password" />
          </label>
          <button id="login-button" onClick={(e) => this.loginUser(e)} type="button">Login</button>
          <Link id="login-ref" to="/forgotpassword">Forgot password</Link>
          {this.state.logined == 'error' ? <p>Failed to login. Incorrect password or username</p> : ''}
      </section>
    )
  }
});

export default LoginForm;
