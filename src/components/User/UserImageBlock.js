import React from 'react';
import $ from 'jquery';
import md5 from 'js-md5';

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
    console.log($('#upload-file-input')[0].files[0]);
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
        window.location.reload();
      }
    });
  },
  render() {
    return (
      <div className="user-image-block col-md-3">
        <div onMouseEnter={e => this.showUploadBlock(e)} onMouseLeave={e => this.hideUploadBlock(e)}>
          <img id="user-image" src={"/userimages/" + md5(this.props.username) + ".jpeg"}/>
          <div id="upload-block">
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
