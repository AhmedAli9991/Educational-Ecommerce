const mongoose = require("mongoose");

const courseschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  schedule: {
    type: [
      {
        day:{
          type:String,
          lowercase: true,          
          enum:["monday","tuesday","wednessday","thursday","friday","saturday","sunday"],
          required:true
        },
        time:{
          type:String,
          required:true
        },
      },
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (end) {
        //validate the Email pattern using Regex'
        ed = new Date(end)
        if(end>Date.now())return true
        
        return false
      },
      message: (props) => `${props.value} end date has to be in the future`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    default: null,
  },
  enrolment: {
    type: mongoose.Schema.ObjectId,
    ref: "Enrolment",
    index: true,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseschema);
