const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const userRoute = require("./user");
const entityRoute = require("./entity");
const scoreRoute = require("./score");
const adminRoute = require("./admin");
const uploadRoute = require("./upload");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/entity", entityRoute);
router.use("/score", scoreRoute);
router.use("/admin", adminRoute);
router.use("/upload", uploadRoute);

module.exports = router;