import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Header from '../SiteHeader/Header.js';
import RegisterForm from './RegisterForm.js';

import './style.css';

class Register extends Component {
  render() {
    const {className, ...props} = this.props;
    return (
      <div className={classnames('Register', className)}{...props}>
        <Header />
        <RegisterForm />
      </div>
    );
  }
}

export default Register;
