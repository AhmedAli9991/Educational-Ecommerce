var user = require("../DB/Models/User");
 
//All user being showed to Admin
module.exports.showAlltoAdmin = async (req, res , next) => {
  try {
    if (req.user.Role != "Admin") return res.status(401).json("not authorized");
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
    const allusers = await user.find({ Role: req.params.Role },{ _id: 0, Password: 0 });
    res.status(200).json(allusers);
  } catch (err) {
    err.status=500
    next(err)
  }
};
