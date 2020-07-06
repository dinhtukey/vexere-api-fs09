const { User } = require("../../../../models/User");
const bcrypt = require("bcrypt");
const { promisify } = require("util")
const jwt = require("jsonwebtoken");

const registerUser = (req, res, next) => {
    const { email, password, fullname } = req.body;
    const newUser = new User({ email, password, fullname });
    User.findOne({ email })
        .then(user => {
            if (user) {
                return Promise.reject({
                    status: 400,
                    message: "Email exists"
                })
            }
            
            // bcrypt.genSalt(10, (err, salt) => {
            //     bcrypt.hash(password, salt, (err, hash) => {
            //         newUser.password = hash;
            //         newUser.save()
            //             .then(user => res.status(200).json(user))
            //             .catch(err => res.json(err))
            //     })
            // })
            return newUser.save();
        })
        .then(user=>res.status(200).json(user))
        .catch(err=>{
            if(err.status){
                return res.status(err.status).json(err.message)
            }
            return res.status(500).json(err)
        })
}


const comparePassword = promisify(bcrypt.compare);
const jwtSign = promisify(jwt.sign);
const loginUser = (req,res,next) => {
    const {email,password} = req.body;
    User.findOne({email})
    .then(user=>{
        if(!user){
            return Promise.reject({
                status:404,
                message:"user not found"
            })
        }
       // bcrypt.compare(password,user.password,())
       return Promise.all(
           [
            comparePassword(password,user.password),
            user
           ]
       )

    })
    .then(res => {
        const isMatch = res[0];
        const user = res[1];
        if(!isMatch){
            return Promise.reject({
                status:400,
                message:"password is wrong"
            })
        }
        // return res.status(200).json({message:"login successfully"})
        
        const payload = {
            email: user.email,
            userType: user.User
        }
        // jwt.sign(
        //     payload,
        //     "vexere",
        //     {expiresIn:3600} //1 tiếng sẽ hết hạn
        //     (err,token)
        // )
        return jwtSign(
            payload,
            "vexere",
            {expiresIn:3600}
        )
    })
    .then(token=>{
        res.status(200).json({
            message:"login successfully",
            token
        })
    })
    .catch(err=>{
        if(err.status){
            return res.status(err.status).json(err.message)
        }
        return res.status(500).json(err);
    })
}


const getUsers = (req,res,next) => {
    User.find()
    .then(users=>res.status(200).json(users))
    .catch(err=>res.status(500).json(err))
}

// const patchUserById
module.exports = {
    registerUser,loginUser,getUsers
}