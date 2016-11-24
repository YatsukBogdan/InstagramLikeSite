import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Header from '../SiteHeader/Header.js';
import RestorePasswordForm from './RestorePasswordForm.js';

import './style.css';

class RestorePassword extends Component {

  render() {
    console.log(this.props.params.key);
    const {className, ...props} = this.props;
    return (
      <div className={classnames('RestorePassword', className)}{...props}>
        <Header />
        <RestorePasswordForm permissionKey={this.props.params.key}/>
      </div>
    );
  }
}

export default RestorePassword;
