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
    }, (err, user)=> {
      if (user.image_extension == null){
        user.update({
          username: req.session.username
        },
        {
            $set{ image_extension : mime.extension(file.mimetype)}
        },
        (res) => {
          console.log(res);
        });
      }

      var usernameHash = md5(req.session.username);
      findRemoveSync(__dirname + '/../public/userimages/', {files: usernameHash + '.' + user.image_extension});
      user.image_extension = mime.extension(file.mimetype);
      cb(null, usernameHash + '.' + user.image_extension);
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
