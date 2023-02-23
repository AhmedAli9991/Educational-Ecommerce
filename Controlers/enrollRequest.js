const { validate } = require("../utils/validator");

// All the controler meathods for enrolment CRUD
const coursedoc = require("../db/models/course");
const enrolmentRequests = require("../db/models/course");
const walletdoc = require("../db/models/wallet");

const { createError } = require("../utils/error");
const enrolmentRequests = require("../db/models/enrolmentRequests");

module.exports.sendRequest = async (req, res, next) => {
  try {   
    
    const userwal = await user.findById(req.user._id).populate("wallet")
    const cor = await enrolmentRequests.findById(req.params.id)
    
    if(!cor)throw createError(404,"no such course with this id")
    if(userwal.wallet.amount<cor.price) throw createError(401,"not enough funds")

    const request = await enrolmentRequests.create({course:cor._id,requestedBy:req.user._id});
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};
module.exports.showallRequestsSentbyUser = async (req, res, next) => {
  try {

    //meathod will show all owners and teachers and populate their references
    
    const request = await enrolmentRequests.find({requestedBy:req.user._id});
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};
module.exports.showallRequestsSentbyUserwithResponse = async (req, res, next) => {
  try {

    //meathod will show all owners and teachers and populate their references
    var acceptable= ["accepted","rejected","not responded"]
    if(!acceptable.includes(req.params.response))throw createError(404,"no such response is accepted")
    const request = await enrolmentRequests.find({requestedBy:req.user._id,response:req.params.response});
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

module.exports.showallRequestsSenttoUser = async (req, res, next) => {
  try {

    //meathod will show all owners and teachers and populate their references
    
    const request = await enrolmentRequests.find({"course.owner":req.user._id}).populate("course");
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};
module.exports.showallRequestsSenttoUserwithResponse = async (req, res, next) => {
  try {

    //meathod will show all owners and teachers and populate their references
    var acceptable= ["accepted","rejected","not responded"]
    if(!acceptable.includes(req.params.response))throw createError(404,"no such response is accepted")
    const request = await enrolmentRequests.find({"course.owner":req.user._id,response:req.params.response});
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    //first check if document with the object id exists and that the current user is the owner of course then delete
    const old = await coursedoc.findById(req.params.id)

    if (!old) throw createError(404, "no document in collection");

    if(old.requestedBy==req.user._id)throw createError(401,"not authorized")

    
    const del = await enrolmentRequests.deleteOne({ _id: req.params.id });
    
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};
