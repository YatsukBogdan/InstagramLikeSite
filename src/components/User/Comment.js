import React from 'react';
import $ from 'jquery';

import './style.css';

const Comment = React.createClass({
  render() {
    return(
      <div className="comment-container">
        <p><span className="username-comment-span">{this.props.username}: </span>{this.props.text}</p>
      </div>
    );
  }
});

export default Comment;
