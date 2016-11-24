var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  id: Number,
  image: String,
  likes: Number,
  watches: Number,
  comments: [{
    user_id: Number,
    likes: Number,
    date: Date,
    body: String
  }],
  author_id: Number,
  author_sign: String
});

var UserSchema = new Schema({
  id: Number,
  username:  String,
  passwordHash: String,
  email: String,
  age: Number,
  user_image: String,
  posts: [{post_id: Number}],
  image_extension: String
});

var UserConnectionSchema = new Schema ({
  username: String,
  token: String,
  expire: Number
});

var connection = mongoose.createConnection('mongodb://localhost:27017/hp');

var post = connection.model('post', PostSchema);
var user = connection.model('user', UserSchema);
var userConnection = connection.model('userConnection', UserConnectionSchema);

module.exports = {
  user: user,
  post: post,
  userConnection: userConnection
};
