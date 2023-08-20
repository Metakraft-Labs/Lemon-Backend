const express = require("express");

const entityValidation = require("../validations/entity");
const validate = require("../utilities/validate");
const { entityController } = require("../controllers");
const { isAuth } = require("../middlewares");

const router = express.Router();

router.get("/", validate(entityValidation.list), entityController.list);
router.post("/", isAuth, validate(entityValidation.create), entityController.create);
router.get("/:id", validate(entityValidation.get), entityController.get);
router.put("/:id", isAuth, validate(entityValidation.update), entityController.update);

module.exports = router;
