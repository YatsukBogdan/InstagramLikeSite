import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Header from '../SiteHeader/Header.js';
import EmailForm from './EmailForm.js';

import isAuthorized from '../isAuthorized';

import './style.css';

const ForgotPassword = React.createClass({
  getInitialState() {
    isAuthorized(this);
    return {
      isAuthorized: false
    }
  },
  render() {
    const {className, ...props} = this.props;
    return (
      <div className={classnames('ForgotPassword', className)}{...props}>
        <Header />
        {this.state.isAuthorized ? <p>You are already authorized</p> : <EmailForm />}
      </div>
    );
  }
});

export default ForgotPassword;
