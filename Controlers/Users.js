var user = require("../DB/Models/User");

module.exports.showAlltoAdmin = async (req, res , next) => {
  try {
    if (req.user.Role != "Admin") return res.status(401).json("not authorized");
    const allusers = await user.find({}, { _id: 0, Password: 0 });
    res.status(200).json(allusers);
  } catch (err) {
    next(err)
  }
};

module.exports.showbyRole = async (req, res, next) => {
  try {
    const allusers = await user.find({ Role: req.params.Role },{ _id: 0, Password: 0 });
    res.status(200).json(allusers);
  } catch (err) {
    next(err)
  }
};
