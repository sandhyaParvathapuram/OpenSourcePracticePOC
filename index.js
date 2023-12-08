const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");
const sesTransport = require("nodemailer-ses-transport");
const dotenv = require("./config/index");
const serverless = require("serverless-http");

const SES_CONFIG = {
  accessKeyId: dotenv.accessKeyId,
  secretAccessKey: dotenv.secretAccessKey,
  region: dotenv.region,
};

const transporter = nodemailer.createTransport(
  sesTransport({ ses: new AWS.SES(SES_CONFIG) })
);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const data = req.body;

  const mailOptions = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
    attachments: data.attachments,
  };

  transporter
    .sendMail(mailOptions)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/*", (req, res) => {
  res.status(404).send(`API not foud`);
});

module.exports.handler = serverless(app);
