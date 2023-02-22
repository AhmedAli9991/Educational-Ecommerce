const mongoose = require("mongoose");

const coursechema = new mongoose.Schema({
  name: {
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
    required:true
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
    required: true,
  },
});

module.exports = mongoose.model("Course", coursechema);
