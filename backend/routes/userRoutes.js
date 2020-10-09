const express = require("express");
const router = express.Router();
const { authUser } = require("../controllers/userController");

router.post("/login", authUser);
// router.route("/:id").get(getProductById);

module.exports = router;
