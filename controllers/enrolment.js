const { validate } = require("../utils/validator");

// All the controler meathods for enrolment CRUD
const coursedoc = require("../db/models/course");
const enrolment = require("../db/models/enrolments");
const walletdoc = require("../db/models/wallet");
const transaction = require("../db/models/transaction");
const { createError } = require("../utils/error");
const enrolmentRequests = require("../db/models/enrolmentRequests");
const user = require("../db/models/user");

//when teacher or principal accepts request
module.exports.acceptRequest = async (req, res, next) => {
  try {
    //check if such request exists
    const cor = await enrolmentRequests
      .findById(req.params.id)
      .populate("course");
    if (!cor) throw createError(404, "no request with this id");
    // check if the owner of the course has not already responded to the request of the user
    if (cor.response!="not responded") throw createError(401, "already responded");
    //check if the user currently loged in is the owner of ther course  
    if (cor.course.owner!=req.user._id) throw createError(401, "you are not the owner");
    
    // accept the request
    const request = await enrolmentRequests.findByIdAndUpdate(req.params.id, {
      response: "accepted",responseAt:Date.now()
    });
    // creat a transaction for accepting and transfer the to the wallet of the owne
    const newtrans2 = await transaction.create({
      user: cor.course.owner,
      transctionType: "recieving",
      amount: cor.course.price,
    });
    const old = await user.findById(req.user._id).populate("wallet");

    const new_wal = parseInt(old.wallet.amount) + parseInt(cor.course.price);
    //add the amount that has been paid for the course to the owner's wallet
    const newwallet = await walletdoc.findByIdAndUpdate(old.wallet._id, {
      amount: new_wal,
    });
    //track the earning of enrollment of the course
    var enroll = await enrolment.findOne({course:cor.course._id});    
    var amnt =parseInt(enroll.earning) + parseInt(cor.course.price)
    // add student to the array of enrolled students
    
    const enrolled = await enrolment.findOneAndUpdate(
      { course: cor.course._id },
      { students:[...enroll.students,cor.requestedBy] ,earning:amnt},

      { new: true }
    );
    res.status(201).json(enrolled);
  } catch (err) {
    next(err);
  }
};
module.exports.rejectrequest = async (req, res, next) => {
  try {
    //check if enroll request exists
    const cor = await enrolmentRequests
      .findById(req.params.id)
      .populate("course");
    if (!cor) throw createError(404, "no request with this id");
    //check if user has already responded to the request
    if (cor.response!="not responded") throw createError(401, "already responded");
    //check if the current user that is logged in is the owner of that course 
    if (cor.course.owner!=req.user._id) throw createError(401, "you are not the owner");
    
    //create transaction to refund the value to the wallet of the person who sent the request
    const newtrans2 = await transaction.create({
      user: cor.course.owner,
      transctionType: "refund",
      amount: cor.course.price,
    });
    
    const old = await user.findById(cor.requestedBy).populate("wallet");
    const new_wal = parseInt(old.wallet.amount) + parseInt(cor.course.price);
    //refund all of that cash back into the wallet of the student 
    const update = await walletdoc.findByIdAndUpdate(old.wallet._id, {
      amount: new_wal,
    });
    //reject the request
    const request = await enrolmentRequests.findByIdAndUpdate(req.params.id, {
      response: "rejected",responseAt:Date.now()
    },{new:true});
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

module.exports.enable = async (req, res, next) => {
  try {
    //enable or disable enrolments
    const old = await coursedoc.findById(req.params.id).populate("enrolment")
    //check if the course exists with a certain _id
    if (!old) throw createError(404, "no document in collection");
    //check if the current user that is logged in is the owner of the course
    if (old.owner!=req.user._id) throw createError(401, "you are not the owner");
    //change the enabled status 
    const enabled = await enrolment.findByIdAndUpdate(
      old.enrolment._id,
      { enabled: true },
      { new: true }
    );

    res.status(200).json(enabled);
  } catch (err) {
    next(err);
  }
};

module.exports.disable = async (req, res, next) => {
  try {
    //enable or disable enrolments
    const old = await coursedoc.findById(req.params.id).populate("enrolment")
    //check if the course exists with a certain _id
    if (!old) throw createError(404, "no document in collection");
    //check if the current user that is logged in is the owner of the course
    if (old.owner!=req.user._id) throw createError(401, "you are not the owner");
    //change the enabled status 
    const enabled = await enrolment.findByIdAndUpdate(
      old.enrolment._id,
      { enabled: false },
      { new: true }
    );

    res.status(200).json(enabled);
  } catch (err) {
    next(err);
  }
};
