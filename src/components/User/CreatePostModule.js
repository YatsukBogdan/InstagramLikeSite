import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import Header from '../SiteHeader/Header.js';

import './style.css';

const CreatePostModule = React.createClass({
  getInitialState() {
    return {
      imageUrl: "/there-is-no-image.png"
    }
  },
  onClickUpload() {
    $('#upload-post-file-input').click();
  },
  componentDidMount() {
    $('#upload-block-post').hide();
  },
  showUploadBlock() {
    $('#upload-block-post').fadeIn('fast');
  },
  hideUploadBlock() {
    $('#upload-block-post').fadeOut('fast');
  },
  uploadImage() {
    var data = new FormData();
    var username = this.props.username;
    var component = this;
    data.append('image', $('#upload-post-file-input')[0].files[0]);
    $.ajax({
      method:"POST",
      url: '/uploadpostimage',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: function(res) {
        component.setState({imageUrl: '/getusertmppostimage/' + username + '?' + new Date().getTime()});
        //window.location.reload();
      }
    });
  },
  sendPost() {
    var data = new FormData();
    var username = this.props.username;
    var component = this;
    data.append('image', $('#upload-post-file-input')[0].files[0]);
    data.append('sign', document.getElementById('user-sign').value);
    $.ajax({
      method:"POST",
      url: '/uploadpost',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: function(res) {

        //window.location.reload();
      }
    });
  },
  render() {
    console.log('module visible' + this.props.visible);
    return (
      <div id="create-post-container" style={{visibility: this.props.visible ? 'visible' : 'hidden'}}>
        <div id="close-button" onClick={e => this.props.closeModule(e)}>
          <img id="close-icon-image" src="/close-icon.png"/>
        </div>
        <div id="create-post-block">
          <div id="load-image-block" onMouseEnter={e => this.showUploadBlock(e)} onMouseLeave={e => this.hideUploadBlock(e)}>
            <img id="loaded-image-post" src={this.state.imageUrl}/>
            <div id="upload-block-post">
              <form id="upload_form_post" encType="multipart/form-data"></form>
              <button onClick={e => this.onClickUpload(e)} id="load-image-post-button">Load new image</button>
              <input type="file" id="upload-post-file-input" onChange={e => this.uploadImage(e)} />
            </div>
          </div>
          <div id="sign-block">
            <div class="input-field" id="post-user-sign">
              <input placeholder="Whad you think bout dat shit bro?" id="user-sign" type="text" class="validate"/>
            </div>
          </div>
          <button id="post-button" onClick={(e) => this.sendPost(e)} type="button">Post</button>
        </div>
      </div>
    );
  }
});

export default CreatePostModule;
