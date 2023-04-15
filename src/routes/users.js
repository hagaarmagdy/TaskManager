const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/users");

router.get("/me", auth, userController.getUser);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.put("/:id", auth, userController.updateUser);

router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
