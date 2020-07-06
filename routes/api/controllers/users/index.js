const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const {authenticate} = require("../../../../middlewares/auth/index")
const {authorize} = require("../../../../middlewares/auth/index")
const {uploadImage} = require("../../../../middlewares/uploadImages/index")
const {validatePostUser} = require("../../../../middlewares/validation/users/postUser")

router.get(
    "/users",
    userController.getUsers
);
router.patch(
    "/users/uploadAvatar",
    authenticate,
    uploadImage(["avatars"]),
    userController.uploadAvatar
);
router.get(
    "/users/:id",
    userController.getUserById
);
router.post(
    "/users/register",
    validatePostUser,
    userController.registerUser
);
router.post(
    "/users/login",
    userController.loginUser
);
router.patch(
    "/users/:id",
    authenticate,
    authorize(["admin"]),
    userController.patchUserById
)
router.patch(
    "/users",
    authenticate,
    authorize(["client"]),
    userController.patchUserMe
)
router.delete(
    "/users/:id",
    authenticate,
    authorize(["admin"]),
    userController.deleteUserById
)


module.exports = router;