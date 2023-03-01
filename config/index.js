require('dotenv').config()
const path = require("path");

module.exports = {
    mongoDB:{
        url: process.env.mongoDB || 'mongodb://127.0.0.1:27017/TaskAPI' 
    },
    port: process.env.port || 4000  
}