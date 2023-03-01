const router = require("express").Router();
const user = require("./users");
const course = require("./courses");
const wallet = require("./wallet")
const enrolment = require("./enrollments")
const logger = require("../utils/winston")

const cookieParser = require("cookie-parser");

const { errorHandler } = require("../middleware/errorHandler");
const {verifyToken} = require("../middleware/auth")
const {defaultlimiter,dblimiter} = require("../middleware/ratelimters")
//TODO- Move this rateLimiter to Utils
//TODO- There must be Seperate Rate limiter for DB, SignUp, Login and one Default just like you have here


//allows us to use cookies
router.use(cookieParser());

//middleware that limits the number of request is a default limiter
router.use(defaultlimiter);
//this middleware limits the number of requests to the DB
router.use(dblimiter)
// this call the winston logger middleware
router.use(logger)

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
