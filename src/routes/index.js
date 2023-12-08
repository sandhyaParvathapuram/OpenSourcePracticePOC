const express = require("express");
const bodyParser = require("body-parser");
const { sendEmail } = require("../services/sendEmail");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/send-email", jsonParser, (req, res) => {
  const data = req.body;

  sendEmail(data)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    });
});

router.use("/*", (req, res) => {
  res.status(404).send(`API not found`);
});

module.exports = router;
