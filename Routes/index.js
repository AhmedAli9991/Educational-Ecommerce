const router = require("express").Router();
const user = require("./user");
const course = require("./courses");

const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const { errorHandler } = require("../middleware/errorHandler");

//sets limit of 5 requests in 10 seconds
const limiter = rateLimit({
  windowMs: 1000, //We can have 10 request per second
  max: 10,
  message: "Too many request",
});

//allows us to use cookies
router.use(cookieParser());

//middleware that limits the number of request
router.use(limiter);

//uses the routes in userrouter
router.use("/user", user);
//uses the routes in courserouter
router.use("/course", course);

//uses error handling middleaware
router.use(errorHandler);

module.exports = router;
