//All the Routes related to wallr

const router = require("express").Router();
const walletcontroler = require("../controlers/wallet");

//verifyToken middleware that decodes the JWT and gets the users attributes

//permissions middleware takes in the role which will be allowed for the route 
const {permissions} = require("../middleware/auth")

router.patch("/topup",walletcontroler.topUpWallet);
router.get("/showown",walletcontroler.viewOwnTransactions);
router.patch("/withdraw",walletcontroler.withdraw);
router.get("/showwallet",walletcontroler.viewWallet);
router.get("/showall",permissions("admin"),walletcontroler.viewAllTransactions);

module.exports = router;
