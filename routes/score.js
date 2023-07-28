const express = require("express");

const scoreValidation = require("../validations/score");
const validate = require("../utilities/validate");
const { scoreController } = require("../controllers");
const { isAuth } = require("../middlewares");

const router = express.Router();

router.get("/", validate(scoreValidation.list), scoreController.list);
router.post("/add", isAuth, validate(scoreValidation.add), scoreController.add);

module.exports = router;
