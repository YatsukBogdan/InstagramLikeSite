import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import $ from 'jquery';

import './style.css';

const FindUsersPage = React.createClass({
  componentDidMount() {
    this.findUsers();
  },
  getInitialState() {
    return {
      users: []
    }
  },
  findUsers() {
    $.get(
      '/findusers/' + this.props.word,
      (data) => {
        this.setState({users: data});
      }
    );
  },
  render() {
    var users = [];
    for (var i = 0; i < this.state.users.length; i++){
      users.push(
        <div className='user-finded'>
          <img className='user-finded-image' src={'/getuserimage/' + this.state.users[i].username} />
          <a href={'/user/' + this.state.users[i].username}>{this.state.users[i].username}</a>
        </div>
      )
    }
    return (
      <div>
        {users}
      </div>
    );
  }
});

export default FindUsersPage;
