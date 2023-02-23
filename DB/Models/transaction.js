const mongoose = require("mongoose");

const transactionschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    index: true,
    required: true,
  },
  transctionType:{
    type:String,
    enum:["withdrawal","topup"],
    required :true
  },
  tranctionTime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("transaction", transactionschema);
