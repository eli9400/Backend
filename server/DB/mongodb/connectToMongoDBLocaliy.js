const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const NODE_ENV = config.get("NODE_ENV");
const DB_NAME = config.get("DB_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");

if (NODE_ENV === "production") {
  mongoose
    .connect("mongodb://127.0.0.1:27017/bcard_eli_blechman")
    .then(() => {
      console.log(chalk.magentaBright("connected to MongoDb Locally!"));
    })
    .catch((error) => {
      console.log(
        chalk.redBright(`could not connect to mongo Locally! :${error}`)
      );
    });
} else {
  mongoose
    .connect(
      `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.oxt8hrp.mongodb.net/`
    )
    .then(() => {
      console.log(chalk.magentaBright("connected to Atlas mongoDB"));
    })
    .catch((error) => {
      console.log(
        chalk.redBright(`could not connect to Atlas mongoDB :${error}`)
      );
    });
}
