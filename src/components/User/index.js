import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

import Header from '../SiteHeader/Header.js';
import UserImageBlock from './UserImageBlock.js';
import UserData from './UserData.js';
import CreatePostModule from './CreatePostModule.js';

import isAuthorized from '../isAuthorized';

import './style.css';

const User = React.createClass({
  componentDidMount() {
    this.checkUserExist();
    this.loadUserData();
    isAuthorized(this);
  },
  openModule() {
    this.setState({moduleVisible: true});
  },
  closeModule() {
    this.setState({moduleVisible: false});
  },
  getInitialState() {
    return {
      isAuthorized: false,
      userexist: false,
      email: '',
      age: 0,
      posts: [],
      moduleVisible: false
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
          <button onClick={e => this.openModule(e)}>Add post</button>
          <CreatePostModule visible={this.state.moduleVisible} closeModule={this.closeModule}/>
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
