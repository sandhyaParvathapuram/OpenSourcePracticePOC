const express = require("express");
const routes = require("./src/routes");
const serverless = require("serverless-http");

const app = express();
const port = process.env.PORT || 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports.handler = serverless(app);
