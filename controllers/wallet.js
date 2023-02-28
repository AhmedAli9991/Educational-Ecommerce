const { validate } = require("../utils/validator");
const { cardValidation } = require("../utils/cardValidate");

// All the controler meathods for Wallet and Transactions CRUD
const transaction = require("../db/models/transaction");
const user =  require("../db/models/user");
const { createError } = require("../utils/error");
const wallet = require("../db/models/wallet");

module.exports.topUpWallet = async (req, res, next) => {
  try {

    //this meathod will allow user to top up cash in their wallet
    var { isValid, message } = validate(req.body, [
        "card",
        "expiry",
        "pin",
        "amount"
      ]);
    if (!isValid) throw createError(422, message);
    const {card , pin ,expiry}=req.body
    var { isValid, message } = cardValidation(card,pin,expiry)
    if (!isValid) throw createError(422, message);
    const userwal = await user.findById(req.user._id).populate("wallet")
    const fnalamount= parseFloat(req.body.amount)+parseFloat(userwal.wallet.amount)
    const wall = await wallet.findByIdAndUpdate(userwal.wallet._id,{amount:fnalamount},{new:true});
    const trans = await transaction.create({user:userwal._id,transctionType:"topup",amount:req.body.amount}) 
  
    res.status(201).json({wallet:wall,transaction:trans});  
  } catch (err) {
    next(err);
  }
};
module.exports.withdraw = async (req, res, next) => {
  try {

    //meathod will allow user to withdraw cash from their wallet
    var { isValid, message } = validate(req.body, [
        "card",
        "expiry",
        "pin",
        "amount"
      ]);
    if (!isValid) throw createError(422, message);
    const {card , pin ,expiry}=req.body
    var { isValid, message } = cardValidation(card,pin,expiry)
    if (!isValid) throw createError(422, message);
    const userwal = await user.findById(req.user._id).populate("wallet")
    if(userwal.wallet.amount<req.body.amount)throw createError(401, "not enough funds"); 
    
    const fnalamount= parseFloat(userwal.wallet.amount)-parseFloat(req.body.amount)
    const wall = await wallet.findByIdAndUpdate(userwal.wallet._id,{amount:fnalamount},{new:true});
    const trans = await transaction.create({user:userwal._id,transctionType:"withdrawal",amount:req.body.amount}) 
  
    res.status(201).json({wallet:wall,transaction:trans});  
  } catch (err) {
    next(err);
  }
};
module.exports.viewWallet = async (req, res, next) => {
  try {
    //meathod for user to view their wallet balance
    const userwal = await user.findById(req.user._id).populate("wallet")
    res.status(200).json(userwal.wallet);
  } catch (err) {
    next(err);
  }
};
module.exports.viewOwnTransactions = async (req, res, next) => {
    try {
      //meathod for user to view their wallet balance
      const userwal = await transaction.find({user:req.user._id})
      if(userwal.length==0)throw createError(404,"no transactions found")
      res.status(200).json(userwal);
    } catch (err) {
      next(err);
    }
  };  
module.exports.viewAllTransactions = async (req, res, next) => {
    try {
      //meathod for admin user to view all transactions that have occured
      const userwal = await transaction.find({})
      res.status(200).json(userwal);
    } catch (err) {
      next(err);
    }
  };