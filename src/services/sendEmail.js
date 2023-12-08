const nodemailer = require("nodemailer");
const sesTransport = require("nodemailer-ses-transport");
const AWS = require("aws-sdk");
const dotenv = require("../../config/index");

const SES_CONFIG = {
  accessKeyId: dotenv.accessKeyId,
  secretAccessKey: dotenv.secretAccessKey,
  region: dotenv.region,
};

const transporter = nodemailer.createTransport(
  sesTransport({ ses: new AWS.SES(SES_CONFIG) })
);

function sendEmail(data) {
  const mailOptions = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
    attachments: data.attachments,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
