import React from 'react';
import $ from 'jquery';
import md5 from 'js-md5';

import './style.css';

const UserData = React.createClass({
  render() {
    return (
      <div className="col-md-4 user-data">
        <p id="username"><b>{this.props.username}</b>, {this.props.age}</p>
        <p id="email">{this.props.email}</p>
      </div>
    );
  }
});

export default UserData;
