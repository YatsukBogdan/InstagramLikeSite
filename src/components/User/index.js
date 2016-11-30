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
    isAuthorized(this);
    this.isOwner();
    this.props.route.socket.on('news', function (data) {
      console.log(data);
      this.props.route.socket.emit('my other event', { my: 'data' });
    });
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
      currentUser: 'default',
      restriction: 'user',
      userexist: false,
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
  deleteUser() {
    $.post(
      '/deleteuser',
      {
        username: this.props.params.username
      },
      (data) => {
        console.log('user deleted');
      }
    );
  },
  renderUserPage() {
    if (this.state.userexist){
      return (
        <div>
          <div className="container">
            <UserImageBlock username={this.props.params.username} isOwner={this.state.isOwner}/>
            <UserData username={this.props.params.username} />
            {this.state.isOwner ? <button onClick={e => this.openModule(e)}>Add post</button> : ''}
            {this.state.restriction == 'admin' ? <button onClick={e => this.deleteUser(e)}>Delete this user</button> : ''}
            <CreatePostModule username={this.props.params.username} visible={this.state.moduleVisible} closeModule={this.closeModule}/>
          </div>
          <div className="container">
            <UserPosts isAuthorized={this.state.isAuthorized}
                       username={this.props.params.username}
                       currentUser={this.state.currentUser}
                       socket={this.props.route.socket}/>
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
