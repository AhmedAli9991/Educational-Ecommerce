//User registration and authetication
const user = require("../db/models/user");
const wallet = require("../db/models/wallet");

const bcrypt = require("bcrypt");
const { createJwt } = require("../utils/jwt");
const { validate } = require("../utils/validator");
const {createError}= require("../utils/error");

//user registration
module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

   const val =  validate(req.body,["name","email","password","role"] )
    if (!val.isValid){
      throw(createError(422,val.message))
    }
    const old = await user.findOne({ email });

    if (old)throw(createError(409,"already exists"))  

    var newpassword = await bcrypt.hash(password, 12);
    const wall = await wallet.create({amount:0})
    const newu = await user.create({
      name,
      email,
      password: newpassword,
      role,
      wallet:wall
    });
    res.status(201).json(newu);
  } catch (err) {
    next(err);
  }
};

//user login and authentication using JWTs
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body; 
    const { isValid, message } = validate(req.body, ["email", "password"]);
    if (!isValid) throw(createError(422,message));

    const old = await user.findOne({ email });
    if (!old) {
      throw(createError(404,"No such user registered"));
    }
    const match = await bcrypt.compare(password, old.password);
    if (!match) {
      throw(createError(401,"password not correct"));
    }

    //call to create JWT in Utils
    var AccessToken = createJwt({
      _id: old._id,
      email: old.email,
      role: old.role,
    });
    res.cookie("AccessToken", AccessToken, {
      maxAge: 1 * 60 * 60 * 1000, 
    });
    res.status(200).json({message:"Logged in"});
  } catch (err) {
    next(err);
  }
};

//logout and clear cookies
module.exports.logout = (req, res) => {
  try {
    const { AccessToken } = req.cookies;

    if (!AccessToken)
      next(createError(401,"not logged in"));

    res.clearCookie("AccessToken");
    res.status(200).json({message:"logged out"});
  } catch (err) {
    res.status(400).json(err); //TODO- res.status(500).json({error: err})
  }
};
