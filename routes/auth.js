const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const validate = require("../utilities/validate");
const { isAuth } = require("../middlewares");
const authValidation = require("../validations/auth");

router.post("/login", validate(authValidation.login), authController.login);
router.get("/status", isAuth, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.auth.user
    })
});
router.post("/register", validate(authValidation.register), authController.register);

module.exports = router;