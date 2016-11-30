var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  username: String,
  date: Date,
  text: String
});

var PostSchema = new Schema({
  likedBy: [String],
  likes: Number,
  watches: Number,
  comments: [CommentSchema],
  date: Date,
  author_sign: String,
  img_path: String
});

var UserSchema = new Schema({
  username:  String,
  passwordHash: String,
  email: String,
  age: Number,
  posts: [PostSchema],
  tmp_post_extension: String,
  image_extension: String,
  restriction: String
});

var UserConnectionSchema = new Schema ({
  username: String,
  token: String,
  expire: Number,
  restriction: String
});

var connection = mongoose.createConnection('mongodb://localhost:27017/hp');

var user = connection.model('user', UserSchema);
var userConnection = connection.model('userConnection', UserConnectionSchema);

module.exports = {
  user: user,
  userConnection: userConnection
};
