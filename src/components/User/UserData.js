import React from 'react';
import $ from 'jquery';
import md5 from 'js-md5';

import './style.css';

const UserData = React.createClass({
  render() {
    return (
      <div className="col-md-4">
        <p>{this.props.username}</p>
        <p>{this.props.age}</p>
        <p>{this.props.email}</p>
      </div>
    );
  }
});

export default UserData;
