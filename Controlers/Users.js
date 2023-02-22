var user = require("../db/models/user");
const { validate } = require("../utils/validator");
const {createError}= require("../utils/error");

//All user being showed to Admin
module.exports.showAlltoAdmin = async (req, res , next) => {
  try {
    const allusers = await user.find({}, { _id: 0, Password: 0 });
    res.status(200).json(allusers);
  } catch (err) {
    err.status=500
    next(err)
  }
};
//UserEnters the role in Params at sees all other users that have that perticular role
module.exports.showbyRole = async (req, res, next) => {
  try {
    const allowed = ["admin","teacher","student"]
    if(allowed.includes(req.params.Role)) createError(404,"Role not found")
    
    const allusers = await user.find({ Role: req.params.Role },{ _id: 0, Password: 0 });
    res.status(200).json(allusers);
  } catch (err) {
    next(err)
  }
};
