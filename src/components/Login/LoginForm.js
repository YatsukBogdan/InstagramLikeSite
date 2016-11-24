import React from 'react';
import Router, { Link, browserHistory } from 'react-router';
import $ from 'jquery';
var isAuthorized = require('../isAuthorized');

const LoginForm = React.createClass({
  loginUser(){
    $.post(
      '/login',
    {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    },
    (data) => {
      isAuthorized = data.logined;
      console.log(isAuthorized);
      if (isAuthorized) {
        browserHistory.push('/');
      }
    });
  },
  render() {
    return (
      <section className="login">

          <label for="username">
              Username
              <input type="text" name="username" id="username" />
          </label>

          <label for="password">
              Password
              <input type="password" name="password" id="password" />
          </label>

          <input type="checkbox" name="remember" id="remember" />
          <label className="check" for="remember">Remember Me</label>

          <button onClick={(e) => this.loginUser(e)} type="button">Login</button>
          <p>
            <Link to="/forgotpassword"><a id="login-ref">Forgot password</a></Link>
          </p>
      </section>
    )
  }
});

export default LoginForm;
