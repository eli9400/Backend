const joi = require("joi");

const validateUser = (user) => {
  const FILED_REQUIRED = joi.string().min(2).max(256).required();
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
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
    name: joi
      .object()
      .keys({
        first: FILED_REQUIRED,
        middle: joi.string().min(2).max(256).allow(""),
        last: FILED_REQUIRED,
      })
      .required(),
    phone: message(
      /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
      'user "phone" mast be a valid phone number'
    ),
    email: message(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      'user "mail" mast be a valid mail'
    ),
    password: message(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
      'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-'
    ),
    image: joi
      .object()
      .keys({
        url: message(urlRegex, "url not valid", false),
        alt: joi.string().max(256).allow(""),
      })
      .allow(""),
    address: joi
      .object()
      .keys({
        state: joi.string().max(256).allow(""),
        country: FILED_REQUIRED,
        city: FILED_REQUIRED,
        street: FILED_REQUIRED,
        houseNumber: joi.number().min(1).required(),
        zip: joi.number().min(4).required(),
      })
      .required(),
    isBusiness: joi.boolean().allow(""),
    isAdmin: joi.boolean().allow(""),
  });
  const obj = schema.validate(user);

  return schema.validate(user);
};

module.exports = validateUser;
