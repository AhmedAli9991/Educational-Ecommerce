var user = require("../DB/Models/User");
var bcrypt = require("bcrypt");
var{createjwt} =  require("../Utils/JWT")

module.exports.Register = async (req, res, next) => {
  try {
    const { Name, Email, Password, Role } = req.body;

    old = await user.findOne({ Email });
    if (old) {
      return res.status(200).json("already exists");
    }
    var newPassword = await bcrypt.hash(Password, 12);
    const newu = await user.create({
      Name,
      Email,
      Password: newPassword,
      Role,
    });
    res.status(201).json(newu);
  } catch (err) {
    next(err)
    // res.status(400).json(err);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    old = await user.findOne({ Email });
    if (!old) {
      return res.status(404).json("No such user registered");
    }
    const match = await bcrypt.compare(Password, old.Password);
    if (!match) {
      return res.status(400).json("password not correct");
    }
    var AccessToken = createjwt({ _id: old._id, Email: old.Email, Role: old.Role });
    res.cookie("AccessToken", AccessToken, {
      maxAge: 10000000000,
    });
    res.status(200).json("Logged in");
  } catch (err) {
    next(err)
    // res.status(400).json(err);
  }
};
module.exports.Logout = (req, res) => {
  try {
    const { AccessToken } = req.cookies;
    console.log(AccessToken);

    if (!AccessToken)
      return res.status(401).json("cannot logout if you are not logged in");

    res.clearCookie("AccessToken");
    res.status(200).json("logged out");
  } catch (err) {
    res.status(400).json(err);
  }
};
  