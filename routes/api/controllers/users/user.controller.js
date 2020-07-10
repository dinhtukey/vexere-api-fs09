//3th package
const { User } = require("../../../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

//built-in package
const { promisify } = require("util")
const registerUser = (req, res, next) => {
    const { email, password, fullname,userType } = req.body;
    let newUser = new User({ email, password, fullname,userType });
    newUser.save()
        .then(user => res.status(200).json(user))
        .catch(err => {
            return res.status(500).json(err)
        })
}


const comparePassword = promisify(bcrypt.compare);
const jwtSign = promisify(jwt.sign);
const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return Promise.reject({
                    status: 404,
                    message: "user not found"
                })
            }
            // bcrypt.compare(password,user.password,())
            return Promise.all(
                [
                    comparePassword(password, user.password),
                    user
                ]
            )

        })
        .then(res => {
            const isMatch = res[0];
            const user = res[1];
            if (!isMatch) {
                return Promise.reject({
                    status: 400,
                    message: "password is wrong"
                })
            }
            // const payload = {
            //     _id: user._id,
            //     email: user.email,
            //     userType: user.User
            // }
            const payload = _.pick(user, ["_id", "email", "userType"]);
            return jwtSign(
                payload,
                "DinhTu",
                { expiresIn: 3600 }
            )
        })
        .then(token => {
            return res.status(200).json({
                message: "login successfully",
                token
            })
        })
        .catch(err => {
            if (err.status) {
                return res.status(err.status).json({ message: err.message })
            }
            return res.status(500).json(err);
        })
}


const getUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json(err))
}

const getUserById = (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
}

const patchUserById = (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            if (!user) {
                return Promise.reject({
                    status: 404,
                    message: "user not exists"
                })
            }
            //const keys = ["email","password","fullname","userType"]
            Object.keys(req.body).forEach(key => {
                user[key] = req.body[key]
            })
            return user.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => {
            if (err.status) {
                return res.status(err.status).json({ message: err.message })
            }
            return res.status(500).json(err)
        })
}
const deleteUserById = (req, res, next) => {
    const { id } = req.params;
    let _user;
    User.findById(id)
        .then(user => {
            _user = user
            if (!user) return Promise.reject({
                status: 404,
                message: "User not found"
            })
            return User.deleteOne({ _id: id })
        })
        .then(() => {
            return res.status(200).json({ message: "delete successfully" })
        })
        .catch(err => res.status(500).json(err))
}

const patchUserMe = (req, res, next) => {
    const { _id } = req.user
    User.findById(_id)
        .then(user => {
            if (!user) {
                return Promise.reject({
                    status: 404,
                    message: "user not exists"
                })
            }
            //const keys = ["email","password","fullname","userType"]
            Object.keys(req.body).forEach(key => {
                user[key] = req.body[key]
            })
            return user.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => {
            if (err.status) {
                return res.status(err.status).json({ message: err.message })
            }
            return res.status(500).json(err)
        })
}
const uploadAvatar = (req, res, next) => {
    const { email } = req.user;
  
    User.findOne({ email })
      .then(user => {
        if (!user) return Promise.reject({
          status: 404,
          message: "Email not exist"
        })
  
        user.avatar = req.file.path
        return user.save()
      })
      .then(user => res.status(200).json(user))
      .catch(err => {
        if (err.status === 400) return res.status(err.status).json({
          message: err.message
        })
        return res.json(err)
      })
  }
// const patchUserById
module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    uploadAvatar,
    patchUserById,
    deleteUserById,
    patchUserMe
}