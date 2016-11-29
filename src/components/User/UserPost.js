import React from 'react';
import $ from 'jquery';

import './style.css';

const UserPost = React.createClass({
  getInitialState() {
    $.post(
    );
    return {
      liked: this.props.liked
    }
  },
  like() {
    $.post(
      '/likepost',
      {
        username: this.props.currentUser,
        post_id: this.props.id
      },
      (res) => {
        if (res.data == 'success'){
          this.setState({liked: !this.state.liked});
        }
      }
    );
  },
  render() {
    return (
      <div className='user-post'>
        <img className='user-post-image' src={'/getuserpostimage/' + this.props.username + '/' + this.props.id}/>
        <p>{this.props.sign}</p>
        <p>Likes: {this.props.likes}</p>
        {this.state.liked ? <p>Liked</p> : <p>Not liked</p>}
        {this.props.isAuthorized ? <button onClick={e => this.like(e)}>Like</button> : ''}
        <p>Watches: {this.props.watches}</p>
        <p>Comments: {this.props.comments}</p>
      </div>
    );
  }
});

export default UserPost;
