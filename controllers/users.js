var user = require("../db/models/user");
const { validate } = require("../utils/validator");
const {createError}= require("../utils/error");

//All user being showed to Admin
module.exports.showAlltoAdmin = async (req, res , next) => {
  try {
    const allusers = await user.find({}, { _id: 0, password: 0 });
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
    if(!allowed.includes(req.params.role)) throw createError(404,"Role not found")
    
    const allusers = await user.find({ role: req.params.role },{ _id: 0, password: 0 });
    res.status(200).json(allusers);
  } catch (err) {
    next(err)
  }
};
//show by status
module.exports.showbyStatus = async (req, res, next) => {
  try {
    const allowed = ["Initial","Active","InActive","Deleted"]
    if(!allowed.includes(req.params.status)) throw createError(404,"Role not found")
    
    const allusers = await user.find({ status: req.params.status },{  password: 0 });
    res.status(200).json(allusers);
  } catch (err) {
    next(err)
  }
};
//deactivate user status
module.exports.deactivateUser = async (req, res, next) => {
  try {
    const old = await user.findById(req.params.id);
    if(!old)throw createError(404,"no such user exists")
    const del = await user.findByIdAndUpdate(req.params.id,{status:"Inactive"},{new:true}); 
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};
//delete user status
module.exports.deleteUser = async (req, res, next) => {
  try {
    const old = await user.findById(req.params.id);
    if(!old)throw createError(404,"no such user exists")
    const del = await user.findByIdAndUpdate(req.params.id,{status:"Deleted"},{new:true}); 
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};
//activate user status
module.exports.activateUser = async (req, res, next) => {
  try {
    const old = await user.findById(req.params.id);
    if(!old)throw createError(404,"no such user exists")
    const del = await user.findByIdAndUpdate(req.params.id,{status:"Active"},{new:true}); 
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};