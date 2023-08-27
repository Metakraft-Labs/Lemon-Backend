const express = require("express");

const { uploadController } = require("../controllers");
const { isAuth } = require("../middlewares");

const router = express.Router();

router.post("/", isAuth, uploadController.upload);

module.exports = router;
