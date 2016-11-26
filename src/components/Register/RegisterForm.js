import React from 'react';
import Router, { Link, browserHistory } from 'react-router';
import $ from 'jquery';
var isAuthorized = require('../isAuthorized');

const RegisterForm = React.createClass({
  registerUser() {
    $.post(
      '/register',
    {
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    },
    (data) => {
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
    });
  },
  render() {
    return (
      <section className="register">
          <label for="email">
              E-mail
              <input type="email" name="email" id="email" />
          </label>

          <label for="username">
              Username
              <input type="text" name="username" id="username" />
          </label>

          <label for="password">
              Password
              <input type="password" name="password" id="password" />
          </label>

          <label for="password2">
              Reapet password
              <input type="password" name="password2" id="password2" />
          </label>

          <button id="register-button" onClick={(e) => this.registerUser(e)}>Register</button>
      </section>
    )
  }
});

export default RegisterForm;
