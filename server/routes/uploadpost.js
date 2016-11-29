var express = require('express');
var router = express.Router();
var fs = require('fs');
var findRemoveSync = require('find-remove');
var path = require('path');
var md5 = require('js-md5');
var multer = require('multer');
var mime = require('mime');
var user = require('../databaseutils').user;
var post = require('../databaseutils').post;
//var upload = multer({ dest: './upload' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/userpostimages/');
  },
  filename: function (req, file, cb) {
    user.findOne({
      username: req.session.username
    }, (err, this_user) => {
      if (this_user){
        var post_id = this_user.posts.length;

        console.log('User first post.');

        var newImageNameHash = md5(req.session.username + post_id);
        var imageNameHash = md5(req.session.username + 'tmp');
        findRemoveSync(__dirname + '/../public/userpostimages/', {files: imageNameHash + '.' + this_user.tmp_post_extension});

        this_user.tmp_post_extension = null;
        this_user.save(
          () => {
            req.body.img_path = 'userpostimages/' + newImageNameHash + '.' + mime.extension(file.mimetype);
            cb(null, newImageNameHash + '.' + mime.extension(file.mimetype));
          }
        );
      }
    });
  }
});
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  user.findOne({
    username: req.session.username
  }, (err, this_user) => {
    if (this_user) {
      var post_id = this_user.posts.length;
      this_user.posts.push({
        id: post_id,
        likedBy: [],
        likes: 0,
        watches: 0,
        comments: [],
        author_sign: req.body.sign,
        img_path: req.body.img_path
      });
      this_user.save(
        (err) => {
          console.log('success');
        }
      );
    }
  });
  res.json({
    test: 'ok'
  });
});

module.exports = router;
