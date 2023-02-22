//User registration and authetication
const user = require("../db/models/user");
const bcrypt = require("bcrypt");
const { createJwt } = require("../utils/jwt");
const { validate } = require("../utils/validator");
const {createError}= require("../utils/error");

//user registration
module.exports.register = async (req, res, next) => {
  try {
    const { Name, Email, Password, Role } = req.body;

   const val =  validate(req.body,["Name","Email","Password","Role"] )
    if (!val.isValid){
      throw(createError(422,val.message))
    }
    const old = await user.findOne({ Email });

    if (old)throw(createError(409,"already exists"))  

    var newPassword = await bcrypt.hash(Password, 12);
    const newu = await user.create({
      Name,
      Email,
      Password: newPassword,
      Role,
    });
    res.status(201).json(newu);
  } catch (err) {
    next(err);
  }
};

//user login and authentication using JWTs
module.exports.login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body; //camel case variable names only
    const { isValid, message } = validate(req.body, ["Email", "Password"]);
    if (!isValid) throw(createError(422,message));

    const old = await user.findOne({ Email });
    if (!old) {
      throw(createError(404,"No such user registered"));
    }
    const match = await bcrypt.compare(Password, old.Password);
    if (!match) {
      throw(createError(401,"password not correct"));
    }

    //call to create JWT in Utils
    var AccessToken = createJwt({
      _id: old._id,
      Email: old.Email,
      Role: old.Role,
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
    res.status(400).json(err);
  }
};
