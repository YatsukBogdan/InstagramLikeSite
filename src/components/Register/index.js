import React from 'react';

import Header from '../SiteHeader/Header.js';
import RegisterForm from './RegisterForm.js';

import './style.css';

const Register = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <RegisterForm />
      </div>
    );
  }
});

export default Register;
