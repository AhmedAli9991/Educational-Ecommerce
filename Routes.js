var router = require("express").Router();
var user = require("./Routes/User");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const {ErrorHandler} = require("./Middleware/ErrorHandler");

//sets limit of 5 requests in 10 seconds
const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
  message: "Too many request",
});

//allows us to use cookies 
router.use(cookieParser());

//middleware that limits the number of request
router.use(limiter);

//uses the routes in userrouter
router.use("/user",user);

//uses error handling middleaware
router.use(ErrorHandler);

module.exports = router;
