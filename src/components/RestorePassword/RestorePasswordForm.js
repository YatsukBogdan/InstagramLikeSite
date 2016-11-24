import React from 'react';
import $ from 'jquery';

import './style.css';

const RestorePasswordForm = React.createClass({
  getInitialState() {
    this.checkPermission();
    return {
      restorePermission: true
    };
  },
  checkPermission() {
    console.log(this.props);
    $.get(
      '/restorepassword/' + this.props.permissionKey,
      (data) => {
        this.setState({restorePermission: data.admited });
      }
    );
  },
  render() {
    if (this.state.restorePermission){
      return (
        <section className="register">
            <form action="/restorepassword" method="post">
                <label for="password">
                    Password
                    <input type="password" name="password" id="password" />
                </label>

                <label for="password2">
                    Reapet password
                    <input type="password" name="password2" id="password2" />
                </label>

                <input type="submit" value="Register" />
            </form>
        </section>
      )
    } else {
      return (
        <p>Sorry. You have no permission</p>
      )
    }
  }
});

export default RestorePasswordForm;
