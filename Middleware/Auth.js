var { verify } = require("../Utils/JWT");
//middleware that decodes and attaches the user to the request object
module.exports.getUser = (req, res, next) => {
  try {
    const { AccessToken } = req.cookies;
    if (!AccessToken) return next();
    const user = verify(AccessToken);
    if (user) {
      req.user = user;
      return next();
    }
  } catch (err) {
    next(err);
  }
};
