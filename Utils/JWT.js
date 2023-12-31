var jwt = require("jsonwebtoken");
require('dotenv').config()

//JWT meathods to create and verify the tokens
module.exports.createJwt = (data) => {
  try {
    var Token = jwt.sign({ data }, process.env.secret_key , { expiresIn: 1 * 60 * 60 * 1000 });
    return Token;
  } catch (error) {
    console.log(error);
  }
};

module.exports.verify = (data) => {
  try {
    const decoded = jwt.verify(data, process.env.secret_key);
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
