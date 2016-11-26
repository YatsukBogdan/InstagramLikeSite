import React from 'react';
import $ from 'jquery';

import './style.css';


const UserImageBlock = React.createClass({

  onClickUpload() {
    $('#upload-file-input').click();
  },
  componentDidMount() {
    $('#upload-block').hide();
  },
  showUploadBlock() {
    $('#upload-block').fadeIn('fast');
  },
  hideUploadBlock() {
    $('#upload-block').fadeOut('fast');
  },
  uploadImage() {
    var data = new FormData();
    var username = this.props.username;
    data.append('image', $('#upload-file-input')[0].files[0]);
    $.ajax({
      method:"POST",
      url: '/uploadimage',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: function(res) {
        console.log(res);
        var d = new Date();
        $('#user-image').attr('src', "/getuserimage/" + username + "?" + d.getTime());
        //window.location.reload();
      }
    });
  },
  render() {
    return (
      <div className="user-image-block col-md-3">
        <div onMouseEnter={e => this.showUploadBlock(e)} onMouseLeave={e => this.hideUploadBlock(e)}>
          <img id="user-image" src={"/getuserimage/" + this.props.username}/>
          <div id="upload-block" style={{visibility: this.props.isOwner ? 'visible' : 'hidden'}}>
            <form id="upload_form" encType="multipart/form-data"></form>
            <button onClick={e => this.onClickUpload(e)} id="load-image-button">Load new image</button>
            <input type="file" id="upload-file-input" onChange={e => this.uploadImage(e)} />
          </div>
        </div>
      </div>
    );
  }
});

export default UserImageBlock;
