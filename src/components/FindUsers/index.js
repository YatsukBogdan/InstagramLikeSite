import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Header from '../SiteHeader/Header.js';
import FindUsersPage from './FindUsersPage.js';

import './style.css';

class FindUsers extends Component {
  render() {
    const {className, ...props} = this.props;
    return (
      <div className={classnames('FindUsers', className)}{...props}>
        <Header />
        <FindUsersPage word={this.props.params.word}/>
      </div>
    );
  }
}

export default FindUsers;
