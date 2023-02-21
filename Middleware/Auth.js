var { verify } = require("../Utils/JWT");
//this should be verifyToken not getUser!
module.exports.getUser = (req, res, next) => {
  try {
    const { AccessToken } = req.cookies;
    if (!AccessToken) return next();
    const user = verify(AccessToken);
    if (user) {
      req.user = user; //why you need to check user middleware after this!
      return next();
    } //where is else case?
  } catch (err) {
    next(err);
  }
};
