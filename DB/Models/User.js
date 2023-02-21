const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    index: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        );
      },
      message: (props) => `${props.value} is not a valid Email`,
    },
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    lowercase: true,
    validate: {
      validator: function (role) {
        if (
          role.toLowerCase() == "student" ||
          role.toLowerCase() == "teacher" ||
          role.toLowerCase() == "admin"
        )
          return true;

        return false;
      },
      message: (props) => `${props.value} is not a valid Role`,
    },
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Users", userschema);
