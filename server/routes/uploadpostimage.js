var express = require('express');
var router = express.Router();
var fs = require('fs');
var findRemoveSync = require('find-remove');
var path = require('path');
var md5 = require('js-md5');
var multer = require('multer');
var mime = require('mime');
var user = require('../databaseutils').user;
//var upload = multer({ dest: './upload' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/userpostimages/');
  },
  filename: function (req, file, cb) {
    user.findOne({
      username: req.session.username
    }, (err, this_user)=> {
      if (this_user) {
        var imageNameHash = md5(req.session.username + 'tmp');

        if (this_user.tmp_post_extension == null){
          this_user.tmp_post_extension = mime.extension(file.mimetype);
          this_user.save(
            (res) => {
              console.log(res);
              cb(null, imageNameHash + '.' + mime.extension(file.mimetype));
            }
          );
        } else {
          findRemoveSync(__dirname + '/../public/userpostimages/', {files: imageNameHash + '.' + this_user.tmp_post_extension});
          this_user.tmp_post_extension = mime.extension(file.mimetype);
          this_user.save(
            (res) => {
              console.log(res);
              cb(null, imageNameHash + '.' + mime.extension(file.mimetype));
            }
          );
        }
      }
    });
  }
});
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  res.json({
    test: 'ok'
  });
});

module.exports = router;
