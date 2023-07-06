const lodash = require("lodash");
const Card = require("../models/mongoose/Card");

const generateBizNumber = async () => {
  try {
    const number = lodash.random(100_000, 999_999);
    const card = await Card.findOne(
      { bizNumber: number },
      { bizNumber: 1, _id: 0 }
    );
    if (card) generateBizNumber();
    return number;
  } catch (error) {
    return Promise.reject(`Mongoose Error: ${error.message}`);
  }
};

module.exports = generateBizNumber;
