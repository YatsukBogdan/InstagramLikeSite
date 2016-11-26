import React from 'react';

import './style.css';
import UserPost from './UserPost.js';

const UserPosts = React.createClass({
  render() {
    var posts = [];
    for (var i = 0; i < this.props.posts.length; i++) {
      posts.push(<UserPost username={this.props.username}
                           likes={this.props.posts[i].likes}
                           watches={this.props.posts[i].watches}
                           sign={this.props.posts[i].author_sign}
                           comments={this.props.posts[i].comments}
                           id={i}/>);
    }
    return (
      <div>{posts}</div>
    );
  }
});

export default UserPosts;
