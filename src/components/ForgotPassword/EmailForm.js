import React from 'react';

import './style.css';

const EmailForm = React.createClass({
  render() {
    return (
      <section className="forgot-password">
          <form action="/forgotpassword" method="post">
              <label for="email">
                  E-mail
                  <input type="text" name="email" id="email" />
              </label>
              <input type="submit" value="Send e-mail" />
          </form>
      </section>
    )
  }
});

export default EmailForm;
