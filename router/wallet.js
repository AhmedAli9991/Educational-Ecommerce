//All the Routes related to wallr

const router = require("express").Router();
const walletcontroler = require("../controllers/wallet");

//verifyToken middleware that decodes the JWT and gets the users attributes

//permissions middleware takes in the role which will be allowed for the route 
const {permissions} = require("../middleware/auth")

router.get("/",walletcontroler.viewWallet); 
router.patch("/topup",walletcontroler.topUpWallet);
router.get("/transactions",walletcontroler.viewOwnTransactions); //TODO - change to transactions
router.patch("/withdraw",walletcontroler.withdraw);
router.get("/history",permissions("admin"),walletcontroler.viewAllTransactions);  //TODO - change to history

//TODO - You should add default router here like /wallet and then other Endpoints
module.exports = router;