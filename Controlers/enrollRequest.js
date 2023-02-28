const { validate } = require("../utils/validator");
const mongoose = require("mongoose");

// All the controler meathods for enrolment request from student CRUD
const coursedoc = require("../db/models/course");
const enrolmentRequests = require("../db/models/enrolmentRequests");
const walletdoc = require("../db/models/wallet");
const transaction = require("../db/models/transaction");

const user = require("../db/models/user");

const { createError } = require("../utils/error");


//studnt send request to course owner through here
module.exports.sendRequest = async (req, res, next) => {
  try {   
    
    const userwal = await user.findById(req.user._id).populate("wallet")
    const cor = await coursedoc.findById(req.params.id).populate("enrolment")
    if(!cor.enrolment.enabled) throw createError(401,"enrolment has been disabled")
    //check if the id in params is of a course that is present  
    if(!cor)throw createError(404,"no such course with this id")
    //check if request had been aleady sent
    const pre = await enrolmentRequests.findOne({course:cor._id,requestedBy:req.user._id})
    if(pre)throw createError(401,"already sent request")
    //check if the user has sufficient funds to enroll
    if(userwal.wallet.amount<cor.price) throw createError(401,"not enough funds")


    const walletf = parseFloat(userwal.wallet.amount) - parseFloat(cor.price);
    //deduct money from wallet when user sends request

    const newwallet = await walletdoc.findByIdAndUpdate(userwal.wallet._id, {
      amount: walletf,
    });
    // create the transaction reciet for that

    const newtrans = await transaction.create({
      user: userwal._id,
      transctionType: "payment",
      amount: cor.price,
    });

    const request = await enrolmentRequests.create({course:req.params.id,requestedBy:req.user._id});
    res.status(201).json({request});
  } catch (err) {
    next(err);

  }
};


module.exports.showallRequestsSentbyUser = async (req, res, next) => {
  try {

    //this meathod will show all the request sent by student
    
    const request = await enrolmentRequests.find({requestedBy:req.user._id}).populate("course");
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};
module.exports.showallRequestsSentbyUserwithResponse = async (req, res, next) => {
  try {
  
    //meathod will show all the request that have a certain response status
    var acceptable= ["accepted","rejected","not responded"]
    if(!acceptable.includes(req.params.response))throw createError(404,"no such response is accepted")
    const request = await enrolmentRequests.find({requestedBy:req.user._id,response:req.params.response}).populate("course");
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

module.exports.showallRequestsSenttoUser = async (req, res, next) => {
  try {

    //meathod will show all the request of enrolment made to a certain courses owner 
    const courses = await coursedoc.find({owner:req.user._id})
    const request = await enrolmentRequests.find({course:{$in:courses}}).populate("course").populate("requestedBy");
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};
module.exports.showallRequestsSenttoUserwithResponse = async (req, res, next) => {
  try {

    //meathod will show all the request of enrolment made to a certain courses owner which have a certain status response
    var acceptable= ["accepted","rejected","not responded"]
    if(!acceptable.includes(req.params.response))throw createError(404,"no such response is accepted")
    const courses = await coursedoc.find({owner:req.user._id})
    const request = await enrolmentRequests.find({course:{$in:courses},response:req.params.response}).populate("course").populate("requestedBy");
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    //this meathod is used t delete requests that have been made and have not been responded to 

    //first check if document with the object id exists and that the current is the person who made the request
    const old = await enrolmentRequests.findById(req.params.id).populate("course")

    if (!old) throw createError(404, "no document in collection");
    if(old.requestedBy!=req.user._id)throw createError(401,"not authorized")

    if(old.response!="not responded")throw createError(401,"cant be done")

    const newtrans2 = await transaction.create({
      user: old.requestedBy,
      transctionType: "refund",
      amount: old.course.price,
    });
    //refund the value of course has not started to the user
    const newold = await user.findById(old.requestedBy).populate("wallet");
    const new_wal = parseInt(newold.wallet.amount) + parseInt(old.course.price);

    const update = await walletdoc.findByIdAndUpdate(newold.wallet._id, {
      amount: new_wal,
    });
    //delete the request
    const del = await enrolmentRequests.deleteOne({ _id: req.params.id });
    
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};
