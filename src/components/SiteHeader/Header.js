import React from 'react';
import { Link } from 'react-router'
import './style.css';

import isAuthorized from '../isAuthorized';

const Header = React.createClass({
  renderLoginBlock() {
    if (isAuthorized) {
      return (
        <p className="col-md-1 header-text">
          <Link to='/logout'><a className="site-ref" id="login-ref">Logout</a></Link>
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
