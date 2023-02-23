const { validate } = require("../utils/validator");

// All the controler meathods for enrolment CRUD
const coursedoc = require("../db/models/course");
const enrolment = require("../db/models/enrolments");
const walletdoc = require("../db/models/wallet");
const transaction = require("../db/models/transaction");
const { createError } = require("../utils/error");
const enrolmentRequests = require("../db/models/enrolmentRequests");

module.exports.acceptRequest = async (req, res, next) => {
  try {
    const cor = await enrolmentRequests
      .findById(req.params.id)
      .populate("course");
    if (!cor) throw createError(404, "no request with this id");

    const userwal = await user.findById(req.cor.requestedBy).populate("wallet");

    if (userwal.wallet.amount < cor.course.price)
      throw createError(401, "not enough funds");

    const walletf =
      parseFloat(userwal.wallet.amount) - parseFloat(cor.course.price);
    const request = await enrolmentRequests.findByIdAndUpdate(req.params.id, {
      response: "accepted",
    });

    const newwallet = await walletdoc.findByIdAndUpdate(userwal.wallet._id, {
      amount: walletf,
    });

    const newtrans = await transaction.create({
      user: userwal._id,
      transctionType: "payment",
      amount: cor.course.price,
    });
    const newtrans2 = await transaction.create({
      user: cor.course.owner,
      transctionType: "recieving",
      amount: cor.course.price,
    });

    const enrolled = await enrolment.findByOneAndUpdate(
      { course: cor.course._id },
      { students: { $push: cor.requestedBy } },
      { new: true }
    );
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};
module.exports.rejectrequest = async (req, res, next) => {
  try {
    //meathod will show all owners and teachers and populate their references
    const cor = await enrolmentRequests.findById(req.params.id);
    if (!cor) throw createError(404, "no request with this id");
    const request = await enrolmentRequests.findByIdAndUpdate(req.params.id, {
      response: "rejected",
    });
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

module.exports.enableanddisable = async (req, res, next) => {
  try {
    //first check if document with the object id exists and that the current user is the owner of course then delete
    const old = await enrolmentRequests.findById(req.params.id);

    if (!old) throw createError(404, "no document in collection");

    const enb = !old.enabled;
    const enabled = await enrolmentRequests.findByIdAndUpdate(
      req.params.id,
      { enabled: enb },
      { new: true }
    );

    res.status(200).json(enabled);
  } catch (err) {
    next(err);
  }
};
