const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.get("/users",userController.getUsers);
router.post("/users/register",userController.registerUser);
router.post("/users/login",userController.loginUser);

module.exports = router;