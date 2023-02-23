const mongoose = require("mongoose");

const enrolmentrequestschema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    index: true,
    unique: true,
    required: true,
  },
  requestedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  responseAt: {
    type: Date,
    default: "none",
  },
  response:{
    type: String,
    enum:["accepted","rejected","not responded"],
    default: "not responded",
    
  }
});

module.exports = mongoose.model("EnrolmentRequest", enrolmentrequestschema);
