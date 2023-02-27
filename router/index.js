const router = require("express").Router();
const user = require("./users");
const course = require("./courses");
const wallet = require("./wallet")
const enrolment = require("./enrollments")

const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const { errorHandler } = require("../middleware/errorHandler");
const {verifyToken} = require("../middleware/auth")

//sets limit of 5 requests in 10 seconds
//TODO- Move this rateLimiter to Utils
//TODO- There must be Seperate Rate limiter for DB, SignUp, Login and one Default just like you have here
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
router.use("/course",verifyToken, course);
//uses the routes in walletrouter
router.use("/wallet",verifyToken, wallet);
//uses all the routes for enrolments
router.use("/enrolment",verifyToken, enrolment);

//uses error handling middleaware
router.use(errorHandler);

module.exports = router;
