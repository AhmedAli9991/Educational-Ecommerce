const rateLimit = require("express-rate-limit");
const MongoStore = require('rate-limit-mongo');
const { createError } = require("../utils/error");

const defaultlimiter = rateLimit({   
    windowMs: 1000, //We can have 10 request per second
    max: 10,
    message: "Too many request",
  });

const signuplimiter = rateLimit({   
    windowMs: 1000,
    max: 5,
    message: "Too many signup request",
  });

const loginlimiter = rateLimit({   
    windowMs: 1000,
    max: 5,
    message: "Too many login request",
  });
const dblimiter = rateLimit({
    store: new MongoStore({
      uri: 'mongodb://127.0.0.1:27017/TaskAPI',
      expireTimeMs: 1000,
      errorHandler:(err)=>{return createError(500,err)}
    }),
    max: 10,
    windowMs: 1000,
    message: "Too many request to DB",

});



module.exports = {
    defaultlimiter,dblimiter,signuplimiter,loginlimiter
}