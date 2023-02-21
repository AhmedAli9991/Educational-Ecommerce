var router = require("express").Router();
var user = require("./User");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const {ErrorHandler} = require("../Middleware/ErrorHandler");

const limiter = rateLimit({
  windowMs: 1000, //We can have 10 request per second
  max: 10,
  message: "Too many request",
});

router.use(cookieParser());

router.use(limiter);

router.use("/user",user);

router.use(ErrorHandler);

module.exports = router;
