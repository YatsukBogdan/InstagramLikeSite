import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../SiteHeader/Header.js';

import isAuthorized from '../isAuthorized';

import './style.css';

class Main extends Component {
  render() {
    console.log(isAuthorized);
    const {className, ...props} = this.props;
    return (
      <div className={classnames('Main', className)}{...props}>
        <Header />
      </div>
    );
  }
}

export default Main;
