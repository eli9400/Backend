const express = require("express");
const router = express.Router();
const cardsRouts = require("../cards/routes/cardsRouts");
const usersRouts = require("../Users/routes/usersRouts");
const { handleError } = require("../utils/errorHandler");

router.use("/cards", cardsRouts);
router.use("/users", usersRouts);
router.use((req, res) => handleError(res, 404, "page not found!"));

module.exports = router;
