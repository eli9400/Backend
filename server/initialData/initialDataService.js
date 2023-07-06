const chalk = require("chalk");
const normalizeCard = require("../cards/helpers/normalizeCard");
const validateCard = require("../cards/models/joi/validateCard");
const Card = require("../cards/models/mongoose/Card");
const data = require("./initialData.json");
const validateUser = require("../Users/models/joi/validateUser");
const normalizeUser = require("../Users/helpers/normlaizeUser");
const User = require("../Users/models/mongoose/User");

const generateCardData = async () => {
  const { cards } = data;
  const userId = "649d469982324a26ea1ad0af";
  cards.forEach(async (card) => {
    try {
      const { error } = validateCard(card);
      if (error) throw new Error(`joi Error: ${error.details[0].message}`);
      const normalizedCard = await normalizeCard(card, userId);
      const cardToDB = new Card(normalizedCard);
      await cardToDB.save();
      console.log(chalk.greenBright("add card success"));
    } catch (error) {
      console.log(
        chalk.redBright(`initial Data Generate Card Error: ${error.message}`)
      );
    }
  });
};

const generateUserData = async () => {
  const { users } = data;

  users.forEach(async (user) => {
    try {
      const { error } = validateUser(user);
      if (error) throw new Error(`joi Error: ${error.details[0].message}`);
      const normalizedUser = await normalizeUser(user);
      const userToDB = new User(normalizedUser);
      await userToDB.save();
      console.log(chalk.greenBright("add user success"));
    } catch (error) {
      console.log(
        chalk.redBright(`initial Data Generate user Error: ${error.message}`)
      );
    }
  });
};

exports.generateCardData = generateCardData;
exports.generateUserData = generateUserData;
