var user = require("../DB/Models/User");
module.exports.showProfile = async (req, res) => {
  try {
    // if (!req.user) return res.status(401).json("not logged in");
    delete req.user._id;
    res.status(200).json(req.user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.UpdateProfile = async (req, res, next) => {
  try {
    // if (!req.user) return res.status(401).json("not logged in");
    const updated = await user.findByIdAndUpdate(req.user._id, req.body, {
      _id: 0,
      Password: 0,
    });

    console.log(updated);
    res.status(200).json(updated);
  } catch (err) {
    next(err)
    // res.status(400).json(err);
  }
};

module.exports.DeleteAccount = async (req, res, next) => {
  try {
    // if (!req.user) return res.status(401).json("not logged in");
    const del = await user.deleteOne({ _id: req.user._id });
    res.clearCookie("AccessToken");
    res.status(200).json(del);
  } catch (err) {
    next(err)
    // res.status(400).json(err);
  }
};
