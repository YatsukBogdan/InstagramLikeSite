const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');

var login = require('./routes/login');
var logOut = require('./routes/logout');
var isPageOwner = require('./routes/ispageowner');
var register = require('./routes/register');
var checkUserExist = require('./routes/checkuserexist');
var checkEmail = require('./routes/checkemail');
var findUsers = require('./routes/findusers');
var deleteUser = require('./routes/deleteuser');
var forgotPassword = require('./routes/forgotpassword');
var restorePassword = require('./routes/restorepassword');
var getUserImage = require('./routes/getuserimage');
var getUserPostImage = require('./routes/getuserpostimage');
var getUserTmpPostImage = require('./routes/getusertmppostimage');
var loadUserData = require('./routes/loaduserdata');
var isAuthorized = require('./routes/isauthorized');
var uploadImage = require('./routes/uploadimage');
var uploadPostImage = require('./routes/uploadpostimage');
var uploadPost = require('./routes/uploadpost');


const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));
//app.use(multer({dest:__dirname+'/files/uploads'}).any());

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
app.use('/logout', logOut);
app.use('/ispageowner', isPageOwner);
app.use('/register', register);
app.use('/checkuserexist', checkUserExist);
app.use('/checkemail', checkEmail);
app.use('/forgotpassword', forgotPassword);
app.use('/findusers', findUsers);
app.use('/deleteuser', deleteUser);
app.use('/restorepassword', restorePassword);
app.use('/loaduserdata', loadUserData);
app.use('/getuserimage', getUserImage);
app.use('/getuserpostimage', getUserPostImage);
app.use('/getusertmppostimage', getUserTmpPostImage);
app.use('/uploadimage', uploadImage);
app.use('/uploadpostimage', uploadPostImage);
app.use('/uploadpost', uploadPost);
app.use('/isauthorized', isAuthorized);

module.exports = app;
