const joi = require("joi");

const validateCard = (card) => {
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
    title: FILED_REQUIRED,
    subtitle: FILED_REQUIRED,
    description: joi.string().min(2).max(1024).required(),
    phone: message(
      /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
      'card "phone" mast be a valid phone number'
    ),
    email: message(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      'card "mail" mast be a valid mail'
    ),

    web: message(urlRegex, "Invalid url", false),
    image: joi
      .object()
      .keys({
        url: joi.string().min(14).allow(""),
        alt: joi.string().min(2).max(256).allow(""),
      })
      .required(),
    address: joi
      .object()
      .keys({
        state: joi.string().min(2).max(256).allow(""),
        country: FILED_REQUIRED,
        city: FILED_REQUIRED,
        street: FILED_REQUIRED,
        houseNumber: joi.number().min(1).required(),
        zip: joi.number().min(1).allow(""),
      })
      .required(),
  });
  return schema.validate(card);
};

module.exports = validateCard;
