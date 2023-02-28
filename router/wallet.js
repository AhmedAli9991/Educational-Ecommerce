//All the Routes related to wallr

const router = require("express").Router();
const walletcontroler = require("../controllers/wallet");

//verifyToken middleware that decodes the JWT and gets the users attributes

//permissions middleware takes in the role which will be allowed for the route 
const {permissions} = require("../middleware/auth")

router.patch("/topup",walletcontroler.topUpWallet);
router.get("/showown",walletcontroler.viewOwnTransactions); //TODO - change to transactions
router.patch("/withdraw",walletcontroler.withdraw);
router.get("/showwallet",walletcontroler.viewWallet); //TODO - change to transactions
router.get("/showall",permissions("admin"),walletcontroler.viewAllTransactions);  //TODO - change to history

//TODO - You should add default router here like /wallet and then other Endpoints
module.exports = router;
