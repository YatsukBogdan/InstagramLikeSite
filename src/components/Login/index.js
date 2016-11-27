import React from 'react';

import Header from '../SiteHeader/Header.js';
import LoginForm from './LoginForm.js';

import './style.css';

const Login = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <LoginForm />
      </div>
    );
  }
});

export default Login;
