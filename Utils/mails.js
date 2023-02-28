const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cacfyp@gmail.com",
    pass: "wchaurlbodzacfam",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.signupMail = (email, code) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Signup Successful",
    text: `An account with your email was created. enter the following Code ${code} to verify your account`,
  };

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      return info.response;
    }
  });
};
module.exports.resendpMail = (email, code) => {
    var mailOptions = {
        from: "cacfyp@gmail.com",
        to: email,
        subject: "new code",
        text: `new code to verify enter the following Code ${code} to verify your account`,
      };    
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      return info.response;
    }
  });
};
