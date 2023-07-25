const express = require("express");
const router = express.Router();
const { entityController } = require("../controllers");
const validate = require("../utilities/validate");
const { isAuth, isAdmin } = require("../middlewares");
const entityValidation = require("../validations/entity");

router.use(isAuth);
router.use(isAdmin);

router.get("/", validate(entityValidation.adminList), entityController.list);
router.get("/:id", validate(entityValidation.get), entityController.get);
router.put("/:id", validate(entityValidation.adminUpdate), entityController.update);
router.delete("/:id", validate(entityValidation.delete), entityController.delete);
router.patch("/:id/approve", validate(entityValidation.approve), entityController.approve);
router.patch("/:id/reject", validate(entityValidation.reject), entityController.reject);

module.exports = router;