import React from 'react';
import { Router, Route } from 'react-router';
import io from 'socket.io-client';
let socket = io(`http://localhost:9001`);

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
    <Route path="/" component={Main} socket={socket}/>
    <Route path="/login" component={Login} socket={socket}/>
    <Route path="/register" component={Register} socket={socket}/>
    <Route path="/findusers/:word" component={FindUsers} socket={socket}/>
    <Route path="/about" component={About} socket={socket}/>
    <Route path="/forgotpassword" component={ForgotPassword} socket={socket}/>
    <Route path="/restorepassword/:key" component={RestorePassword} socket={socket}/>
    <Route path="/user/:username" component={User} socket={socket}/>
    <Route path="*" component={NotFound} socket={socket}/>
  </Router>
);

export default Routes;
