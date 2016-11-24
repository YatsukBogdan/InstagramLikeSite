import React from 'react';
import { Link } from 'react-router'
import './style.css';

import $ from 'jquery';

import isAuthorized from '../isAuthorized';

const Header = React.createClass({
  getInitialState() {
    isAuthorized(this);
    return {
      isAuthorized: false
    }
  },
  logout() {
    $.post(
      '/logout',
      {},
      (res) => {
        console.log(res);
        isAuthorized(this);
      }
    );
  },
  renderLoginBlock() {
    if (this.state.isAuthorized) {
      return (
        <p className="col-md-1 header-text">
          <a className="site-ref" id="login-ref" href="/" onClick={(e) => this.logout(e)}>Logout</a>
        </p>
      );
    } else {
      return (
        <div>
          <p className="col-md-1 header-text">
            <Link to='/login'><a className="site-ref" id="login-ref">Login</a></Link>
          </p>
          <p className="col-md-1 header-text">
            <Link to='/register'><a className="site-ref" id="login-ref">Register</a></Link>
          </p>
        </div>
      );
    }
  },
  render() {
    return (
      <div className="container-fluid" id="header">
        <div className="container">
          <p className="col-md-9" id="header-main-text">HolyPortfoly</p>
          {this.renderLoginBlock()}
        </div>
      </div>
    );
  }
});

export default Header;
