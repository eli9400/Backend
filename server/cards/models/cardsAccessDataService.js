const { handleBasicError } = require("../../utils/errorHandler");
const Card = require("./mongoose/Card");

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
  if (DB === "MONGODB")
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBasicError("mongoose", error);
    }
  return Promise.resolve("get cards not in mongodb");
};

const getMyCards = async (userId) => {
  if (DB === "MONGODB")
    try {
      const cards = await Card.find({ user_id: userId });
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBasicError("mongoose", error);
    }

  return Promise.resolve(" my cards not in mongodb");
};

const getCard = async (id) => {
  if (DB === "MONGODB")
    try {
      const card = await Card.findById(id);
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBasicError("mongoose", error);
    }

  return Promise.resolve("  card not in mongodb");
};
const updateCard = async (id, normalizeCard) => {
  if (DB === "MONGODB")
    try {
      const card = await Card.findByIdAndUpdate(id, normalizeCard, {
        new: true,
      });
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBasicError("mongoose", error);
    }

  return Promise.resolve("  card mot in mongodb");
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.updateCard = updateCard;
