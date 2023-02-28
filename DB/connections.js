// connect to mongoDB
const {mongoDB} = require("../config/index")
const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(mongoDB.url); 
  } catch (error) {
    console.log(error);
  }
};
module.exports = connect 
