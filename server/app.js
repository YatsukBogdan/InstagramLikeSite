const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
var user = require('./databaseutils').user;


var login = require('./routes/login');
var logOut = require('./routes/logout');
var likePost = require('./routes/likepost');
var reloadPostLikes = require('./routes/reloadpostlikes');
var isPageOwner = require('./routes/ispageowner');
var register = require('./routes/register');
var comment = require('./routes/comment');
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
var loadUserPosts = require('./routes/loaduserposts');
var isAuthorized = require('./routes/isauthorized');
var uploadImage = require('./routes/uploadimage');
var uploadPostImage = require('./routes/uploadpostimage');
var uploadPost = require('./routes/uploadpost');


const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9001);

const LOG_PREFIX = 'APP ROUTE';
function getCurrentTime() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}
function logMessage(msg) {
  console.log(getCurrentTime() + '     ' + LOG_PREFIX + '     ' + msg);
}

io.on('connection', function (socket) {
  socket.on('likepost', (data) => {
    const sess_username = data.currentUser;
    const post_username = data.username;
    const post_id = data.post_id;

    user.findOne({
      username: post_username
    }, (err, _user) => {
      if (err){
        logMessage('Error on database call');
        return;
      }
      if (_user){
        for (var i = 0; i < _user.posts[post_id].likedBy.length; i++) {
          if (_user.posts[post_id].likedBy[i] == sess_username){
            _user.posts[post_id].likedBy.pull(sess_username);
            _user.posts[post_id].likes--;
            _user.save( (err) => {
              if (err){
                logMessage(`Error on saving like state on database call`);
              }
              logMessage(`Post ${post_id} of user ${post_username} unliked by ${sess_username}`);
              io.sockets.emit('onlike');
            });
            return;
          }
        }

        _user.posts[post_id].likedBy.push(sess_username);
        _user.posts[post_id].likes++;
        _user.save( (err) => {
          if (err){
            logMessage(`Error on saving like state on database call`);
            return;
          }
          logMessage(`Post ${post_id} of user ${post_username} liked by ${sess_username}`);
          io.sockets.emit('onlike');
        });
      } else {
        logMessage(`There is no ${post_username} in the database`);
      }
    });
  })
});
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
app.use('/likepost', likePost);
app.use('/reloadpostlikes', reloadPostLikes);
app.use('/ispageowner', isPageOwner);
app.use('/register', register);
app.use('/comment', comment);
app.use('/checkuserexist', checkUserExist);
app.use('/checkemail', checkEmail);
app.use('/forgotpassword', forgotPassword);
app.use('/findusers', findUsers);
app.use('/deleteuser', deleteUser);
app.use('/restorepassword', restorePassword);
app.use('/loaduserdata', loadUserData);
app.use('/loaduserposts', loadUserPosts);
app.use('/getuserimage', getUserImage);
app.use('/getuserpostimage', getUserPostImage);
app.use('/getusertmppostimage', getUserTmpPostImage);
app.use('/uploadimage', uploadImage);
app.use('/uploadpostimage', uploadPostImage);
app.use('/uploadpost', uploadPost);
app.use('/isauthorized', isAuthorized);

module.exports = app;
