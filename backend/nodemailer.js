const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "tejwanikaushit@gmail.com",
      pass: "oppqnizyuhmsnbss",
    },
  });

  module.exports=transporter;