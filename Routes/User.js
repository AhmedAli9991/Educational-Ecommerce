//All the Routes related to User

const router = require("express").Router();
const userauthcontroler = require("../Controlers/usersAuths");
const usercontroler = require("../Controlers/users");
const profilecontroler = require("../Controlers/userProfile")

//verifyToken middleware that decodes the JWT and gets the users attributes

//permissions middleware takes in the role which will be allowed for the route 
const {verifyToken,permissions} = require("../middleware/auth")

router.post("/register",userauthcontroler.register);
router.post("/login",userauthcontroler.login);
router.post("/logout",userauthcontroler.logout);
router.get("/getProfile",verifyToken,profilecontroler.showProfile);
router.patch("/updateProfile",verifyToken,profilecontroler.updateProfile);
router.delete("/delProfile",verifyToken,profilecontroler.deleteAccount);
router.get("/showAlltoAdmin",verifyToken,permissions("admin"),usercontroler.showAlltoAdmin);
router.get("/showAllRole/:Role",verifyToken,usercontroler.showbyRole);

module.exports = router;
