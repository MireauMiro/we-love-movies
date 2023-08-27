const router = require("express").Router({ mergeParams: true });
const controller = require("./critics.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:criticId").all(methodNotAllowed);

module.exports = router;
