module.exports.CheckUser = (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json("not logged in");
    else next();
  } catch (error) {
    next(error);
  }
};
