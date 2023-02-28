require('dotenv').config()
const path = require("path");

module.exports = {
    mongoDB:{
        url: process.env.mongoDB || 'mongodb://127.0.0.1:27017/TaskAPI' 
    },
    port: process.env.PORT || 4000  //TODO- Use this Port, not the hardcoded one
}