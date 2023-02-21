var user = require("../DB/Models/User");

module.exports.showAlltoAdmin = async (req, res , next) => {
  try {
    // if (!req.user) return res.status(401).json("not logged in");

    if (req.user.Role != "Admin") return res.status(401).json("not authorized");

    const allusers = await user.find({}, { _id: 0, Password: 0 });
    res.status(200).json(allusers);
  } catch (err) {
    next(err)
    // res.status(400).json(err);
  }
};

module.exports.showbyRole = async (req, res, next) => {
  try {
    console.log(req.user);
    // if (!req.user) return res.status(401).json("not logged in");

    const allusers = await user.find({ Role: req.params.Role },{ _id: 0, Password: 0 });

    res.status(200).json(allusers);
  } catch (err) {
    next(err)
    // res.status(400).json(err);
  }
};
