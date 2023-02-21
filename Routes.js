var router = require("express").Router();
var user = require("./Routes/User");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const {ErrorHandler} = require("./Middleware/ErrorHandler");

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
  message: "Too many request",
});

router.use(cookieParser());

router.use(limiter);

router.use("/user",user);

router.use(ErrorHandler);

module.exports = router;
