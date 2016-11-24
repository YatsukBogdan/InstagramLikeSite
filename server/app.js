const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

var login = require('./routes/login');
var register = require('./routes/register');
var checkUserExist = require('./routes/checkuserexist');
var forgotPassword = require('./routes/forgotpassword');
var restorePassword = require('./routes/restorepassword');
var getUserImage = require('./routes/restorepassword');
var loadUserData = require('./routes/loaduserdata');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/hp');
app.use(expressSession({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: { maxAge: 2628000000 },
    store: (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose, // optional
        host: 'localhost', // optional
        port: 27017, // optional
        db: 'hp', // optional
        collection: 'sessions', // optional
        expire: 86400 // optional
    })
}));

// Always return the main index.html, so react-router render the route in the client
app.use('/login', login);
app.use('/register', register);
app.use('/checkuserexist', checkUserExist);
app.use('/forgotpassword', forgotPassword);
app.use('/restorepassword', restorePassword);
app.use('/loaduserdata', loadUserData);
app.use('/getuserimage', getUserImage);

module.exports = app;
