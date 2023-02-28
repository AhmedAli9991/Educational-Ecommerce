const mongoose = require("mongoose");

const verificationschema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
        validator: function (email) {
          //validate the Email pattern using Regex
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
          );
        },
        message: (props) => `${props.value} is not a valid Email`,
      },
    required:true    
  },
  code:{
    type:String,
    validate: {
        validator: function (code) {
          //validate if code is upto 4 digits 
          return code.length==4
        },
        message: (props) => `${props.value} is not 4 digits`,
      },    
    required :true
  },
})
module.exports = mongoose.model("verification", verificationschema);
