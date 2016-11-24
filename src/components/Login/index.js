import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Header from '../SiteHeader/Header.js';
import LoginForm from './LoginForm.js';

import './style.css';

class Login extends Component {
  render() {
    const {className, ...props} = this.props;
    return (
      <div className={classnames('Login', className)}{...props}>
        <Header />
        <LoginForm />
      </div>
    );
  }
}

export default Login;
