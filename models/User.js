const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { promisify } = require("util")

// //promisify : chuyển callback sang promise
// const genSalt = promisify(bcrypt.genSalt);
// const hash = promisify(bcrypt.hash)

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    userType: {
        type: String,
        default: "client"
    },
    avatar: {type:String}
})


//sử dụng callback để sử dụng con trỏ this
UserSchema.pre("save", function beforeSave (next) {
    const user = this;
    if(!user.isModified("password")) return next();
    bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash => {
        user.password = hash;
        next();
    })
});
const User = mongoose.model("User", UserSchema, "User");
module.exports = {
    UserSchema, User
}