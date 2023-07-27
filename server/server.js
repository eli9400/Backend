const express = require("express");
const app = express();
const chalk = require("chalk");
const router = require("./router/router");
const cors = require("./cors/cors");
const logger = require("../server/logers/morganLoger");
const config = require("config");

const {
  generateCardData,
  generateUserData,
} = require("./initialData/initialDataService");
app.use(logger);
app.use(cors);
app.use(express.json());
app.use(express.text());
app.use(router);
app.use(express.static("./public"));

const PORT = config.get("PORT");
console.log(chalk.magentaBright("in server.js"));

app.listen(PORT, async () => {
  console.log(chalk.bgBlueBright(`listener to: http://localhost:${PORT}`));
  require("./DB/mongodb/connectToMongoDBLocaliy");
  await generateCardData();
  await generateUserData();
});
