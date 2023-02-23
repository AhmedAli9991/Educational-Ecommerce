const mongoose = require("mongoose");

const enrolmentschema = new mongoose.Schema({
  students: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
      },
    ],
    default: [],
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  earning: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("Enrolment", enrolmentschema);
