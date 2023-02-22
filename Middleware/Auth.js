var { verify } = require("../utils/jwt");
const { createError } = require("../utils/error");

//middleware that decodes and attaches the user to the request object
module.exports.verifyToken = (req, res, next) => {
  try {
    const { AccessToken } = req.cookies;
    if (!AccessToken) return next();
    const user = verify(AccessToken);
    if (user) {
      req.user = user.data;
      console.log("middleware",req.user)
      return next();
    } else {
      throw createError(401, "not logged in");
    }
  } catch (err) {
    next(err);
  }
};

module.exports.permissions = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw createError(401, "Unautherized");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
