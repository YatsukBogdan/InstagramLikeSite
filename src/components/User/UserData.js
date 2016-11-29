import React from 'react';
import $ from 'jquery';
import md5 from 'js-md5';

import './style.css';

const UserData = React.createClass({
  componentDidMount() {
    this.loadUserData();
  },
  getInitialState(){
    return {
      email: '',
      age: 0
    }
  },
  loadUserData() {
    $.post(
      '/loaduserdata',
      {
        username: this.props.username
      },
      (data) => {
        this.setState({
          email: data.email,
          age: data.age
        });
      }
    );
  },
    render() {
    return (
      <div className="col-md-4 user-data">
        <p id="userpage-username"><b>{this.props.username}</b>, {this.state.age}</p>
        <p id="userpage-email">{this.state.email}</p>
      </div>
    );
  }
});

export default UserData;
