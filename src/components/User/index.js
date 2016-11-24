import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

import Header from '../SiteHeader/Header.js';
import UserImageBlock from './UserImageBlock.js';
import UserData from './UserData.js';

import './style.css';

const User = React.createClass({
  getInitialState() {
    this.checkUserExist();
    this.loadUserData();
    return {
      userexist: false,
      email: '',
      age: 0,
      posts: []
    }
  },
  loadUserData() {
    $.post(
      '/loaduserdata',
      {
        username: this.props.params.username
      },
      (data) => {
        this.setState({
          email: data.email,
          age: data.age,
          posts: data.posts
        });
      }
    );
  },
  checkUserExist() {
    $.post(
      '/checkuserexist',
      {
        username: this.props.params.username
      },
      (data) => {
        this.setState({userexist: data.userexist});
      }
    );
  },
  renderUserPage() {
    if (this.state.userexist){
      return (
        <div className="container">
          <UserImageBlock username={this.props.params.username}/>
          <UserData username={this.props.params.username} age={this.state.age} email={this.state.email}/>
          <Link to="/createpost"><a>Create post</a></Link>
        </div>
      );
    } else {
      return (
        <div className="container">
          <p>User is not exist</p>
        </div>
      );
    }
  },
  render() {
    const {className, ...props} = this.props;
    return (
      <div className={classnames('User', className)}{...props}>
        <Header />
        {this.renderUserPage()}
      </div>
    );
  }
});

export default User;
