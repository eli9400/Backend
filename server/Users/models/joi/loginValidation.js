const joi = require("joi");

const validateLogin = (user) => {
  const message = (regex, message, required = true) => {
    if (required) {
      return joi
        .string()
        .ruleset.regex(regex)
        .rule({ message: message })
        .required();
    }

    return joi
      .string()
      .ruleset.regex(regex)
      .rule({ message: message })
      .allow("");
  };
  const schema = joi.object({
    email: message(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      'user "mail" mast be a valid mail'
    ),
    password: message(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
      'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-'
    ),
  });

  return schema.validate(user);
};

module.exports = validateLogin;
