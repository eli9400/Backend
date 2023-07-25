const { handleError } = require("../../utils/errorHandler");
const normalizeCard = require("../helpers/normalizeCard");
const validateCard = require("../models/joi/validateCard");
const Card = require("../models/mongoose/Card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    if (!cards) throw new Error("is no have a cards in the database");

    res.status(201).send(cards);
  } catch (error) {
    handleError(res, 400, error.message);
  }
};
const getCard = async (req, res, next) => {
  try {
    const id = req.params.cardID;
    const card = await Card.findById(id);

    if (!card) throw new Error("card whit this id not exist");
    if (!req.user) res.status(201).send(card);
    req.card = card;
    next();
  } catch (error) {
    handleError(res, 403, error.message);
  }
};
const getMyCards = async (req, res) => {
  try {
    if (!req.user.isBusiness)
      throw new Error("Only a business conveyor user can see their tickets");
    const { _id } = req.user;
    const myCards = await Card.find({ user_id: _id });
    if (!myCards) throw new Error("this user is not have cards in the sistema");
    res.status(201).send(myCards);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

const createCard = async (req, res) => {
  try {
    const card = req.body;
    const { _id, isBusiness } = req.user;
    if (!isBusiness)
      throw new Error(
        "to create a new card the user must bi a business status"
      );

    const { error } = validateCard(card);
    if (error) handleError(req, 400, `joi Error: ${error.message}`);
    console.log(_id);
    const normalizedCardFromUser = await normalizeCard(card, _id);
    console.log(normalizedCardFromUser);
    const newCard = new Card(normalizedCardFromUser);

    const cardFromDB = await newCard.save();
    res.status(201).send(cardFromDB);
  } catch (error) {
    handleError(res, 500, `error mongo:${error.message}`);
  }
};
const editCard = async (req, res) => {
  try {
    console.log("test 1");
    const { _id } = req.user;
    const card = req.card;
    if (`${card.user_id}` !== _id)
      throw new Error(
        "Only the user who created this card can make changes to this card"
      );
    const cardFromClient = req.body;
    console.log(cardFromClient);
    const editCard = await Card.findByIdAndUpdate(card._id, cardFromClient, {
      new: true,
    });
    if (!editCard)
      throw new Error("There was an error updating the business card");
    res.status(201).send(editCard);
  } catch (error) {
    handleError(res, 400, error.message);
  }
};
const likeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const id = req.params.cardID;
    const card = await Card.findById(id);
    console.log(card);
    if (!card)
      throw new Error("A card with this ID cannot be found in the database");
    const likesCard = card.likes.findIndex((id) => id === userId);

    if (likesCard === -1) {
      card.likes.push(userId);
      card.save();
    }
    if (likesCard >= 0) {
      card.likes.splice(likesCard, likesCard + 1);
      card.save();
    }
    res.status(201).send(card);
  } catch (error) {
    handleError(res, 400, error.message);
  }
};
const deleteCard = async (req, res) => {
  try {
    const user = req.user;
    const { cardID } = req.params;
    const card = await Card.findById(cardID);

    if (!user.isAdmin && user._id !== `${card.user_id}`)
      throw new Error(
        "Only an admin user or the user who created this card is authorized to perform this action"
      );

    const deleteCard = await Card.findByIdAndDelete(cardID);

    console.log(deleteCard);
    if (!deleteCard) throw new Error("user id not found");
    res.status(201).send(deleteCard);
  } catch (error) {
    console.log("test");
    handleError(res, 403, `mongoDB Error: ${error.message}`);
  }
};

exports.getCards = getCards;
exports.getCard = getCard;
exports.getMyCards = getMyCards;
exports.createCard = createCard;
exports.editCard = editCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
