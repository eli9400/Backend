const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const authorizeAPIs = ["http://127.0.0.1:5500", "http://localhost:3000"];
const options = (req, callback) => {
  const isExist = authorizeAPIs.find((api) => api === req.headers.origin);

  if (!isExist)
    return callback(
      chalk.redBright(
        `cors Error: the api :${req.headers.origin} is  not recognized`
      ),
      { origin: false }
    );
  callback(null, { origin: true });
};

app.use(cors(options));
module.exports = app;
