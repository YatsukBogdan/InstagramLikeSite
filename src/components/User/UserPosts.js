import React from 'react';
import $ from 'jquery';
import './style.css';
import UserPost from './UserPost.js';

const UserPosts = React.createClass({
  componentDidMount() {
    this.loadUserPosts();
  },
  getInitialState() {
    return {
      posts: []
    }
  },
  loadUserPosts() {
    $.post(
      '/loaduserposts',
      {
        username: this.props.username
      },
      (data) => {
        this.setState({posts: data.posts});
      }
    );
  },
  render() {
    var posts = [];
    for (var i = 0; i < this.state.posts.length; i++) {
      var liked = false;
      for (var j = 0; j < this.state.posts[i].likedBy.length; j++){
        if (this.state.posts[i].likedBy[j] == this.props.currentUser) {
          liked = true;
          break;
        }
      }
      posts.push(<UserPost username={this.props.username}
                           currentUser={this.props.currentUser}
                           liked={liked}
                           likes={this.state.posts[i].likes}
                           watches={this.state.posts[i].watches}
                           sign={this.state.posts[i].author_sign}
                           comments={this.state.posts[i].comments}
                           id={i}
                           isAuthorized={this.props.isAuthorized}
                           socket={this.props.socket} />);
    }
    return (
      <div>{posts}</div>
    );
  }
});

export default UserPosts;
