import React from 'react';
import Router, { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import md5 from 'js-md5';
import complexity from 'complexity';
var isAuthorized = require('../isAuthorized');

const RegisterForm = React.createClass({
  getInitialState() {
    return {
      buttonDisabled: 'disabled',
      emailexist: false,
      userexist: false,
      badPassword: false,
      secondPasswordEqual: true
    }
  },
  checkEmail() {
    $.post(
      '/checkemail',
    {
      email: document.getElementById('email').value
    },
    (data) => {
      this.setState({emailexist: data.emailexist});
      this.checkRegisterButtonAvailability();
    });
  },
  checkUsername() {
    $.post(
      '/checkuserexist',
      {
        username: document.getElementById('username').value
      },
      (data) => {
        this.setState({userexist: data.userexist});
        this.checkRegisterButtonAvailability();
      }
    );
  },
  registerUser() {
    $.post(
      '/register',
    {
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
      passwordHash: md5(document.getElementById('password').value)
    },
    (reg_data) => {
      $.post(
        '/login',
      {
        username: document.getElementById('username').value,
        password: md5(document.getElementById('password').value)
      },
      (login_data) => {
        if (login_data.logined) {
          browserHistory.push('/');
        }
      });
    });
  },
  checkPasswordComplexity() {
    var password = document.getElementById('password').value;
    var options = {
      lowercase    : 1,  // a through z
      digit        : 1,  // 0 through 9
      min          : 8,  // minumum number of characters
    }
    if (complexity.check(password, options)) {
      this.setState({badPassword: false});
    } else {
      this.setState({badPassword: true});
    }

    this.checkPasswordEqual();
  },
  checkPasswordEqual() {
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;

    if (password == password2) {
      this.setState({secondPasswordEqual: true});
    } else {
      this.setState({secondPasswordEqual: false});
    }

    this.checkRegisterButtonAvailability();
  },
  checkRegisterButtonAvailability() {
    if (!this.state.emailexist && !this.state.userexist && !this.state.badPassword && this.state.secondPasswordEqual &&
        document.getElementById('username').value != '' && document.getElementById('email').value != '' &&
        document.getElementById('password').value != '' && document.getElementById('password2').value != '') {
      this.setState({buttonDisabled: ''});
    } else {
      this.setState({buttonDisabled: 'disabled'});
    }
  },
  render() {
    return (
      <section className="register">
          <label>
              E-mail
              <input onChange={e => this.checkEmail(e)} type="email" name="email" id="email" />
          </label>
          {this.state.emailexist ? <p>Email is alreay used</p> : ''}
          <label>
              Username
              <input onChange={e => this.checkUsername(e)} type="text" name="username" id="username" />
          </label>
          {this.state.userexist ? <p>Username is alreay used</p> : ''}

          <label>
              Password
              <input onChange={e => this.checkPasswordComplexity(e)} type="password" name="password" id="password" />
          </label>
          {this.state.badPassword ? <p>Your password isnt good enough</p> : ''}

          <label>
              Reapet password
              <input onChange={e => this.checkPasswordEqual(e)} type="password" name="password2" id="password2" />
          </label>
          {this.state.secondPasswordEqual ? '' : <p>Password didnt match</p>}

          <button id="register-button" onClick={(e) => this.registerUser(e)}>Register</button>
      </section>
    )
  }
});

export default RegisterForm;
