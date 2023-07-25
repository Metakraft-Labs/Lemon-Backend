const express = require("express");

const entityValidation = require("../validations/entity");
const validate = require("../utilities/validate");
const { entityController } = require("../controllers");
const { isAuth } = require("../middlewares");

const router = express.Router();

router.use(isAuth);

router.get("/", validate(entityValidation.list), entityController.list);
router.get("/:id", validate(entityValidation.get), entityController.get);
router.update("/:id", validate(entityValidation.update), entityController.update);

module.exports = router;
