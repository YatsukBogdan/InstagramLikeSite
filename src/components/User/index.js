import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

import Header from '../SiteHeader/Header.js';
import UserImageBlock from './UserImageBlock.js';
import UserData from './UserData.js';
import UserPosts from './UserPosts.js';
import CreatePostModule from './CreatePostModule.js';

import isAuthorized from '../isAuthorized';

import './style.css';

const User = React.createClass({
  componentDidMount() {
    this.checkUserExist();
    this.loadUserData();
    isAuthorized(this);
    this.isOwner();
  },
  openModule() {
    this.setState({moduleVisible: true});
    document.documentElement.style.overflow = 'hidden';
  },
  closeModule() {
    this.setState({moduleVisible: false});
    document.documentElement.style.overflow = 'auto';
  },
  getInitialState() {
    return {
      isAuthorized: false,
      userexist: false,
      email: '',
      age: 0,
      posts: [],
      moduleVisible: false,
      isOwner: false
    }
  },
  isOwner(){
    $.post(
      '/ispageowner',
      {
        username: this.props.params.username
      },
      (data) => {
        this.setState({isOwner: data.isOwner});
      }
    );
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
  renderUserPosts() {
    if (this.state.posts) {
      return (
        <UserPosts username={this.props.params.username} posts={this.state.posts} />
      );
    } else {
      return (
        <p>User have no posts yet</p>
      );
    }
  },
  renderUserPage() {
    if (this.state.userexist){
      return (
        <div>
          <div className="container">
            <UserImageBlock username={this.props.params.username} isOwner={this.state.isOwner}/>
            <UserData username={this.props.params.username} age={this.state.age} email={this.state.email}/>
            {this.state.isOwner ? <button onClick={e => this.openModule(e)}>Add post</button> : ''}
            <CreatePostModule username={this.props.params.username} visible={this.state.moduleVisible} closeModule={this.closeModule}/>
          </div>
          <div className="container">
            {this.renderUserPosts()}
          </div>
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
