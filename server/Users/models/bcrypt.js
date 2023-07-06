const bcrypt = require("bcryptjs");

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (passwordFormClient, passwordFromDB) =>
  bcrypt.compareSync(passwordFormClient, passwordFromDB);

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
