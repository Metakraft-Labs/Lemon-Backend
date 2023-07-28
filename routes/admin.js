const express = require("express");
const router = express.Router();
const { entityController } = require("../controllers");
const validate = require("../utilities/validate");
const { isAuth, isAdmin } = require("../middlewares");
const entityValidation = require("../validations/entity");

router.use(isAuth);
router.use(isAdmin);

router.get("/entity", validate(entityValidation.adminList), entityController.list);
router.get("/entity/:id", validate(entityValidation.get), entityController.get);
router.put("/entity/:id", validate(entityValidation.adminUpdate), entityController.update);
router.delete("/entity/:id", validate(entityValidation.delete), entityController.delete);
router.patch("/entity/:id/approve", validate(entityValidation.approve), entityController.approve);
router.patch("/entity/:id/reject", validate(entityValidation.reject), entityController.reject);

module.exports = router;