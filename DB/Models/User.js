const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
    validate: {
      validator: function (email) {
        //validate the Email pattern using Regex
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        );
      },
      message: (props) => `${props.value} is not a valid Email`,
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    lowercase: true,
    validate: {
      validator: function (role) {
        //Check allowed role or not
        if (
          role.toLowerCase() == "student" ||
          role.toLowerCase() == "teacher" ||
          role.toLowerCase() == "principal" ||
          role.toLowerCase() == "admin"
        )
          return true;

        return false;
      },
      message: (props) => `${props.value} is not a valid Role`,
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  wallet:{
    type: mongoose.Schema.ObjectId,
    ref: "Wallet",
    index: true,
    unique: true,
    required: true,
 
  },
  //TODO- Add Status here for user. Following will be status Also add migration for the existing users
  //Initial- By default
  //Active- Verified
  //InActive- Blocked
  //Deleted- Deleled
});
module.exports = mongoose.model("Users", userschema);
