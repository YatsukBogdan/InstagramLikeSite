import React from 'react';

import './style.css';

const UserPost = React.createClass({
  render() {
    return (
      <div className='user-post'>
        <img className='user-post-image' src={'/getuserpostimage/' + this.props.username + '/' + this.props.id}/>
        <p>{this.props.sign}</p>
        <p>Likes: {this.props.likes}</p>
        <p>Watches: {this.props.watches}</p>
        <p>Comments: {this.props.comments}</p>
      </div>
    );
  }
});

export default UserPost;
