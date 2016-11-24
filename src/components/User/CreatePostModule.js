import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Header from '../SiteHeader/Header.js';

import './style.css';

const CreatePostModule = React.createClass({
  render() {
    console.log('module visible' + this.props.visible);
    return (
      <div id="create-post-container" class="col-md-12" style={{visibility: this.props.visible ? 'visible' : 'hidden'}}>
        <button onClick={e => this.props.closeModule(e)}>close</button>
      </div>
    );
  }
});

export default CreatePostModule;
