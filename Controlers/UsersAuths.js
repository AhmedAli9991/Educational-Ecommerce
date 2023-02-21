var user = require("../DB/Models/User");
var bcrypt = require("bcrypt");
var { createjwt } = require("../Utils/JWT");
const { validate } = require("../Utils/validator");

module.exports.Register = async (req, res, next) => {
  try {
    const { Name, Email, Password, Role } = req.body;
    if (
      Name === null ||
      Name === undefined ||
      Email === null ||
      Email === undefined ||
      Password === null ||
      Password === undefined ||
      Role === (null|| undefined) //Suggestion: you can do this as well!
    ) //What happens if someone send empty string, empty array or Object?
      return res.status(406).json("Enter all required fields");

    old = await user.findOne({ Email }); //where is this old declared?

    if (old) return res.status(409).json("already exists");

    var newPassword = await bcrypt.hash(Password, 12);
    const newu = await user.create({
      Name,
      Email,
      Password: newPassword,
      Role,
    });
    res.status(201).json(newu);
  } catch (err) {
    next(err);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;//camel case variable names only
    const {isValid,message} = validate(req.body,["Email","Password"])
    if (!isValid)
      return res.status(406).json(message);

    old = await user.findOne({ Email });
    if (!old) {
      return res.status(404).json("No such user registered");
    }
    const match = await bcrypt.compare(Password, old.Password);
    if (!match) {
      return res.status(400).json("password not correct");
    }
    var AccessToken = createjwt({
      _id: old._id,
      Email: old.Email,
      Role: old.Role,
    });
    res.cookie("AccessToken", AccessToken, {
      maxAge: 1*60* 60 *1000, //add this like this
    });
    res.status(200).json("Logged in"); //this is not JSON! 
  } catch (err) {
    next(err);
  }
};
module.exports.Logout = (req, res) => {
  try {
    const { AccessToken } = req.cookies;

    if (!AccessToken)
      return res.status(401).json("cannot logout if you are not logged in");

    res.clearCookie("AccessToken");
    res.status(200).json("logged out");
  } catch (err) {
    res.status(400).json(err);
  }
};
