const mongoose = require("mongoose");

const walletschema = new mongoose.Schema({
  amount: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("Wallet", walletschema);
