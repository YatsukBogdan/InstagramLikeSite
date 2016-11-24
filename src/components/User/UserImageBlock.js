import React from 'react';
import $ from 'jquery';
import md5 from 'js-md5';

import './style.css';

const UserImageBlock = React.createClass({
  checkUserExist() {
    $.post(
      '/checkuserexist',
      {
        username: this.props.username
      },
      (data) => {
        this.setState({userexist: data.userexist});
      }
    );
  },
  renderUserPage() {
    this.checkUserExist();

  },
  render() {
    return (
      <div className="user-image-block col-md-4">
        <div>
          <img className="userimage" src={"/userimages/" + md5(this.props.username) + ".jpg"} />
        </div>
        <form action="/updateimage" enctype="multipart/form-data">
          <input type="file" name="user-image"/>
          <input type="submit" value="Upload image"/>
        </form>
      </div>
    );
  }
});

export default UserImageBlock;
