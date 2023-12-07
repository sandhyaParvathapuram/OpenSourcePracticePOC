const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");
const sesTransport = require("nodemailer-ses-transport");
const dotenv = require("./config/index");

const SES_CONFIG = {
  accessKeyId: dotenv.accessKeyId,
  secretAccessKey: dotenv.secretAccessKey,
  region: dotenv.region,
};

const transporter = nodemailer.createTransport(
  sesTransport({ ses: new AWS.SES(SES_CONFIG) })
);
// const email = (data)=>{
//     return new Promise((resolve, rejects)=>{
//         const msg = {
//           to: data.to,
//           from: "rgaddam@evoketechnologies.com",
//           subject: data.subject,
//           text: data.body,
//           html: data.html,
//           attachments : data.attachments
//         };

//         sgMail
//           .send(msg)
//           .then(() => {
//             console.log("Email sent successfully");
//             resolve("Email sent successfully");
//           })
//           .catch((error) => {
//             console.error("Error sending email:", error);
//             rejects("Error sending email:", error);
//           });
//     })

// }

const data = {
  to: "ramarao.g92@gmail.com",
  subject: "testmail",
  html: "<p>TEST SAMPLE MAIL</p>",
  text: "sample mail",
};

const email = (data) => {
  return new Promise((resolve, rejects) => {
    const mailOptions = {
      from: "sandhya15031996@gmail.com",
      to: data.to,
      subject: data.subject,
      html: data.html,
      text: data.body,
      attachments: data.attachments,
    };
    transporter
      .sendMail(mailOptions)
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        rejects(err);
      });
  });
};
email(data)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
// module.exports = email;
