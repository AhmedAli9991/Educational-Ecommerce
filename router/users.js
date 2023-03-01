//All the Routes related to User

const router = require("express").Router();
const userauthcontroler = require("../controllers/userAuths");
const usercontroler = require("../controllers/users");
const profilecontroler = require("../controllers/userProfile")

//verifyToken middleware that decodes the JWT and gets the users attributes

//permissions middleware takes in the role which will be allowed for the route 
const {verifyToken,permissions} = require("../middleware/auth")
const {signuplimiter,loginlimiter} = require("../middleware/ratelimters")

router.post("/register",signuplimiter,userauthcontroler.register);
router.post("/login",loginlimiter,userauthcontroler.login);
router.post("/logout",userauthcontroler.logout);
router.post("/verification",userauthcontroler.verification);
router.post("/resend",userauthcontroler.resend);


router.route("/profile",verifyToken).get(profilecontroler.showProfile)
.patch(profilecontroler.updateProfile).patch(profilecontroler.deleteAccount);

router.get("/showAlltoAdmin",verifyToken,permissions("admin"),usercontroler.showAlltoAdmin);
router.get("/showAllRole/:role",verifyToken,usercontroler.showbyRole);
router.get("/showStatus/:status",verifyToken,permissions("admin"),usercontroler.showbyStatus);

//user id of whose status is to be changed is passed to params through these routes
router.patch("/deactivate/:id",verifyToken,permissions("admin"),usercontroler.deactivateUser)
router.patch("/remove/:id",verifyToken,permissions("admin"),usercontroler.deleteUser);
router.patch("/reActivate/:id",verifyToken,permissions("admin"),usercontroler.activateUser);


module.exports = router;
