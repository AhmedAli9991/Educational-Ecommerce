const { validate } = require("../utils/validator");

// All the controler meathods for course CRUD
const coursedoc = require("../db/models/course");
const enrolmentdoc =require("../db/models/enrolments")
const { createError } = require("../utils/error");

module.exports.add = async (req, res, next) => {
  try {
    // attach current users id to the body as owner for later creation
    // roles already checked by middle ware
    req.body.owner=req.user._id
    const { isValid, message } = validate(req.body, [
      "name",
      "schedule",
      "endDate",
      "owner",
      "price"
    ]);
    if (!isValid) throw createError(422, message);

    const enrolment = await enrolmentdoc.create({})
    req.body.enrolment = enrolment
    // if the role of the person creating the course is teacher by default they will be both the owner as well as the teacher
    if(req.user.role=="teacher")req.body.teacher=req.body.owner

    
    const course = await coursedoc.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};
module.exports.showall = async (req, res, next) => {
  try {

    //meathod will show all owners and teachers and populate their references
    const course = await coursedoc
      .find({})
      .populate("teacher")
      .populate("owner");
    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};
module.exports.viewOne = async (req, res, next) => {
  try {
    const course = await coursedoc
      .findById(req.params.id)
      .populate("teacher")
      .populate("owner");
    if (!course) throw createError(404, "no such course");
    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    //first check if document with the object id exists and that the current user is the owner of course then delete
    const old = await coursedoc.findById(req.params.id)
    if (!old) throw createError(404, "no document in collection");
    if(req.user._id!=old.owner)throw createError(401, "not autherized to delete");

    const course = await coursedoc.deleteOne({ _id: req.params.id });
    
    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};
module.exports.update = async (req, res, next) => {
  try {
    //first check if document with the object id exists and that the current user is the owner of course then update
    const old = await coursedoc.findById(req.params.id)
    if (!old) throw createError(404, "no document in collection");
    if(req.user._id!=old.owner)throw createError(401, "not autherized to update");    
    const { isValid, message } = validate(req.body, [
      "name",
      "schedule",
      "endDate",
      "price"
    ]);
    if (!isValid) throw createError(422, message);
    const course = await coursedoc.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await res.json(course);
  } catch (err) {
    next(err);
  }
};
