import React from 'react';
import { Router, Route } from 'react-router';

import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import NotFound from './components/NotFound';
import ForgotPassword from './components/ForgotPassword';
import FindUsers from './components/FindUsers';
import RestorePassword from './components/RestorePassword';
import User from './components/User';

const Routes = (props) => (
  <Router {...props} >
    <Route path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/findusers/:word" component={FindUsers} />
    <Route path="/about" component={About} />
    <Route path="/forgotpassword" component={ForgotPassword} />
    <Route path="/restorepassword/:key" component={RestorePassword} />
    <Route path="/user/:username" component={User} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
