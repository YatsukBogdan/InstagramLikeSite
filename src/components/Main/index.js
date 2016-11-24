import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../SiteHeader/Header.js';

import isAuthorized from '../isAuthorized';

import './style.css';

const Main = React.createClass({
  getInitialState() {
    isAuthorized(this);
    return {
      isAuthorized: false
    }
  },
  render() {
    console.log(this.state.isAuthorized);
    const {className, ...props} = this.props;
    return (
      <div className={classnames('Main', className)}{...props}>
        <Header />
      </div>
    );
  }
});

export default Main;
