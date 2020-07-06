const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { promisify } = require("util")

//promisify : chuyển callback sang promise
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash)

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    userType: {
        type: String,
        default: "client"
    }
})

UserSchema.pre("save", function (next) {
    const user = this;
    return genSalt(10)
    .then(salt => {
        return hash(user.password, salt)
    })
    .then(hash => {
        user.password = hash;
        next();
    })
});
const User = mongoose.model("User", UserSchema, "User");
module.exports = {
    UserSchema, User
}