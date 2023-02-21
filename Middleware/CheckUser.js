//Dont need this 
module.exports.CheckUser = (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json("not logged in"); //Remove this and add valid JSON with status and message
    else next();
  } catch (error) {
    next(error);
  }
};
