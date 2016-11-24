import React from 'react';

import './style.css';

const Header = React.createClass({
  render() {
    return (
      <div className="container-fluid" id="header">
        <div className="container">
          <p className="col-md-9" id="header-main-text">HolyPortfoly</p>
          <p className="col-md-1 header-text">
            <a id="login-ref">Login</a>
          </p>
          <p className="col-md-1 header-text">
            <a class="site-ref" id="login-ref" href="/about">Register</a>
          </p>
        </div>
      </div>
    );
  }
});

export default Header;
