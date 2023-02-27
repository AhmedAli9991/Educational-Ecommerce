const path = require("path");

module.exports = {
    mongoDB:{
        url: 'mongodb://127.0.0.1:27017/TaskAPI' //TODO- Use this URL, not the hardcoded one
    },
    port: process.env.PORT || 4000  //TODO- Use this Port, not the hardcoded one
}