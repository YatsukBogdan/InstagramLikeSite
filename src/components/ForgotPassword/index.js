import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Header from '../SiteHeader/Header.js';
import EmailForm from './EmailForm.js';

import './style.css';

class ForgotPassword extends Component {
  render() {
    const {className, ...props} = this.props;
    return (
      <div className={classnames('ForgotPassword', className)}{...props}>
        <Header />
        <EmailForm />
      </div>
    );
  }
}

export default ForgotPassword;
