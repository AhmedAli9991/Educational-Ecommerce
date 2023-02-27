const { validate } = require("../utils/validator");

// All the controler meathods for usre profiling

var user = require("../db/models/user");
const { createError } = require("../utils/error");

module.exports.showProfile = async (req, res, next) => {
  try {
    console.log(req.user);
    const profile = await user.findById(req.user._id, {
      _id: 0,
      password: 0,
    });
    if (!profile) {
      throw createError(404, "Not Found");
    }
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const val = validate(req.body, ["name", "email"]);
    if (!val.isValid) {
      throw createError(422, val.message);
    }
    const updated = await user.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    console.log(updated);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAccount = async (req, res, next) => {
  try {
    const del = await user.deleteOne({ _id: req.user._id });
    res.clearCookie("AccessToken");
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};


