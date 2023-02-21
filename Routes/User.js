const router = require("express").Router();
const userauthcontroler = require("../Controlers/UsersAuths");
const usercontroler = require("../Controlers/Users");
const profilecontroler = require("../Controlers/UserProfile")
const {getUser} = require("../Middleware/Auth")
const {CheckUser} = require("../Middleware/CheckUser")

router.route("/register").post(userauthcontroler.Register);
router.route("/login").post(userauthcontroler.Login);
//router.post("/login",userauthcontroler.Login); //You can use this simple syntax!
router.route("/logout").post(userauthcontroler.Logout);
router.route("/getProfile").get(getUser,CheckUser,profilecontroler.showProfile);//Validate/verifyToken and show profile, no need to add multiple middleware
//router.get("/getProfile",verifyToken,profilecontroler.showProfile); //this is better!
router.route("/updateProfile").patch(getUser,CheckUser,profilecontroler.UpdateProfile);
router.route("/delProfile").delete(getUser,CheckUser,profilecontroler.DeleteAccount);
router.route("/showAlltoAdmin").get(getUser,CheckUser,usercontroler.showAlltoAdmin);
router.route("/showAllRole/:Role").get(getUser,CheckUser,usercontroler.showbyRole);

module.exports = router;
