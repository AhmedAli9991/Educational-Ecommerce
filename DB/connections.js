// connect to mongoDB

const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/TaskAPI"); //TODO- Get this URL from Config
  } catch (error) {
    console.log(error);
  }
};
module.exports = connect 
