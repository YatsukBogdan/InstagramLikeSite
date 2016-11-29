import React from 'react';
import { Link, browserHistory } from 'react-router';
import './style.css';
import $ from 'jquery';

import isAuthorized from '../isAuthorized';

const Header = React.createClass({
  componentDidMount(){
    document.getElementById("find-user-input").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        browserHistory.push('/findusers/' + document.getElementById("find-user-input").value);
        window.location.reload();
      }
    });
    isAuthorized(this);
  },
  getInitialState() {
    return {
      isAuthorized: false,
      currentUser: 'default'
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
        <p className="col-md-3 header-text">
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
          <p className="col-md-5" id="header-main-text">HolyPortfoly</p>
          <input className="col-md-4" id='find-user-input' type="text" name='username'/>
          {this.renderLoginBlock()}
        </div>
        {this.state.isAuthorized ? <a href={'/user/' + this.state.currentUser}>My profile</a> : ''}
      </div>
    );
  }
});

export default Header;
