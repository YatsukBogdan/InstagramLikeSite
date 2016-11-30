import React from 'react';
import $ from 'jquery';

import './style.css';

const UserPost = React.createClass({
  componentDidMount() {
    this.props.socket.on('onlike', () => {
      $.post(
        '/reloadpostlikes',
        {
          username: this.props.username,
          post_id: this.props.id
        },
        (data) => {
          this.setState({likes: data.likes});
        }
      );
    });
  },
  sendComment() {
    $.post(
      '/comment',
      {
        comment: document.getElementById("post-" + this.props.id).value,
        username: this.props.username,
        post_id: this.props.id
      },
      (res) => {
        console.log('success');
      },
    );
  },
  getInitialState() {
    $.post(
    );
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
    /*$.post(
      '/likepost',
      {
        username: this.props.username,
        post_id: this.props.id
      },
      (res) => {
        if (res.data == 'success'){
          this.setState({liked: !this.state.liked});
        }
      }
    );*/
  },
  render() {
    var comments = [];
    for (var i = 0; i < this.props.comments.length; i++){
      comments.push(<p>{this.props.comments[i].text}</p>)
    }
    return (
      <div className='user-post'>
        <img className='user-post-image' src={'/getuserpostimage/' + this.props.username + '/' + this.props.id}/>
        <p>{this.props.sign}</p>
        <p>Likes: {this.state.likes}</p>
        {this.state.liked ? <p>Liked</p> : <p>Not liked</p>}
        {this.props.isAuthorized ? <button onClick={e => this.like(e)}>Like</button> : ''}
        <p>Watches: {this.props.watches}</p>
        <p>Comments: </p>
        <div>{comments}</div>
        <input id={"post-" + this.props.id} />
        <button onClick={e => this.sendComment(e)}>Send comment</button>
      </div>
    );
  }
});

export default UserPost;
