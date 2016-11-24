var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var user = require('../databaseutils').user;


function createkey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i = 0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

router.post('/', (req, res) => {
  const email_ = req.body.email;

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'holyportfolysupp@gmail.com', // Your email id
      pass: 'holysitesupp' // Your password
    }
  });

  user.findOne({
    email: email_
  }, (err, user) => {
    if (user) {
      req.session.username = user.username;
    }
  });

  var restoreKey = createkey();
  req.session.restorepasskey = restoreKey;
  var restorePassLink = 'localhost:3000/restorepassword/' + restoreKey;

  var mailOptions = {
      to: email_, // list of receivers
      subject: 'Forgoten password', // Subject line
      text: 'Follow the link to restore your password: ' + restorePassLink //, // plaintext body
      // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json({yo: 'error'});
    } else {
      console.log('Message sent: ' + info.response);
      res.json({yo: info.response});
    };
  });
});

module.exports = router;
