const express = require("express");
const {
  getCards,
  getCard,
  getMyCards,
  createCard,
  editCard,
  likeCard,
  deleteCard,
} = require("../controller/cardsController");
const auth = require("../../auth/authService");
const router = express.Router();

router.get("/", getCards);
router.get("/my-cards", auth, getMyCards);
router.get("/:cardID", getCard);

router.post("/", auth, createCard);

router.put("/:cardID", auth, getCard, editCard);

router.patch("/:cardID", auth, likeCard);

router.delete("/:cardID", auth, deleteCard);

module.exports = router;
