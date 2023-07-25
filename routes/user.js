const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const validate = require("../utilities/validate");
const userValidation = require("../validations/user");
const { isAuth } = require("../middlewares");

router.put("/", isAuth, validate(userValidation.update), userController.update);

module.exports = router;