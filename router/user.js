//All the Routes related to User

const router = require("express").Router();
const userauthcontroler = require("../controllers/userAuths");
const usercontroler = require("../controlers/users");
const profilecontroler = require("../controlers/userProfile")

//verifyToken middleware that decodes the JWT and gets the users attributes

//permissions middleware takes in the role which will be allowed for the route 
const {verifyToken,permissions} = require("../middleware/auth")

router.post("/register",userauthcontroler.register);
router.post("/login",userauthcontroler.login);
router.post("/logout",userauthcontroler.logout);
router.get("/getProfile",verifyToken,profilecontroler.showProfile); //TODO- instead of getProfile, use /profile/:id
router.patch("/updateProfile",verifyToken,profilecontroler.updateProfile);  //TODO- instead of updateProfile, use /profile/edit/:id
router.delete("/delProfile",verifyToken,profilecontroler.deleteAccount); //TODO- instead of delProfile, use /profile/:id
router.get("/showAlltoAdmin",verifyToken,permissions("admin"),usercontroler.showAlltoAdmin);
router.get("/showAllRole/:role",verifyToken,usercontroler.showbyRole);

module.exports = router;
