import React from 'react';
import $ from 'jquery';

import './style.css';

const UserPost = React.createClass({
  getInitialState() {
    $.post(
    );
    return {
      liked: false
    }
  },
  like() {
    this.setState();
  },
  render() {
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
          <UserPosts isAuthorized={this.state.isAuthorized} username={this.props.params.username}/>
        </div>
      </div>
    );
  }
});

export default UserPost;
