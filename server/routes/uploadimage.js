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
    cb(null, 'server/public/userimages/');
  },
  filename: function (req, file, cb) {
    user.findOne({
      username: req.session.username
    }, (err, this_user)=> {
      if (this_user) {
        var usernameHash = md5(req.session.username);

        if (this_user.image_extension == null){
          this_user.image_extension = mime.extension(file.mimetype);
          this_user.save(
            (res) => {
              console.log(res);
              cb(null, usernameHash + '.' + mime.extension(file.mimetype));
            }
          );
        } else {
          findRemoveSync(__dirname + '/../public/userimages/', {files: usernameHash + '.' + this_user.image_extension});
          this_user.image_extension = mime.extension(file.mimetype);
          this_user.save(
            (res) => {
              console.log(res);
              cb(null, usernameHash + '.' + mime.extension(file.mimetype));
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
