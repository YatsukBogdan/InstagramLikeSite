import React from 'react';
import $ from 'jquery';
import Comment from './Comment.js';

import './style.css';

const Comments = React.createClass({
  getInitialState() {
    var comments = [];
    for (var i = 0; i < this.props.comments.length; i++){
      comments.push(<Comment text={this.props.comments[i].text}
                             username={this.props.comments[i].username}
                             date={this.props.comments[i].date} />);
    }
    return {
      comments: comments
    }
  },
  componentDidMount() {
    this.props.socket.on('oncomment', (data) => {
      var comments_io = [];
      for (var i = 0; i < data.comments.length; i++){
        comments_io.push(<Comment text={data.comments[i].text}
                                  username={data.comments[i].username}
                                  date={data.comments[i].date} />);
      }
      this.setState({comments: comments_io});
    });
  },
  sendComment() {
    this.props.socket.emit('commentpost', {
      comment: document.getElementById("post-" + this.props.id).value,
      username: this.props.username,
      post_id: this.props.id,
      currentUser: this.props.currentUser
    });
  },
  render() {
    return (
      <div>
        <div>{this.state.comments}</div>
        <input id={"post-" + this.props.id} />
        <button onClick={e => this.sendComment(e)}>Send comment</button>
      </div>
    );
  }
});

export default Comments;
