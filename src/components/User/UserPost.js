import React from 'react';
import $ from 'jquery';
import Comments from './Comments.js';
import './style.css';

const UserPost = React.createClass({
  componentDidMount() {
    this.props.socket.on('onlike', (data) => {
      this.setState({
        likes: data.likes,
        liked: !this.state.liked
      });
    });
  },
  getInitialState() {
    return {
      liked: this.props.liked,
      likes: this.props.likes
    }
  },
  like() {
    this.props.socket.emit('likepost', {
      username: this.props.username,
      post_id: this.props.id,
      currentUser: this.props.currentUser
    });
  },
  render() {
    return (
      <div className='user-post'>
        <img className='user-post-image' src={'/getuserpostimage/' + this.props.username + '/' + this.props.id}/>
        <p>{this.props.sign}</p>
        <p>Likes: {this.state.likes}</p>
        {this.state.liked ? <p>Liked</p> : <p>Not liked</p>}
        {this.props.isAuthorized ? <button onClick={e => this.like(e)}>Like</button> : ''}

        <Comments socket={this.props.socket}
                  comments={this.props.comments}
                  id={this.props.id}
                  username={this.props.username}
                  currentUser={this.props.currentUser}/>
      </div>
    );
  }
});

export default UserPost;
