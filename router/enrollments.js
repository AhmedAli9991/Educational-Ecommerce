//All the Routes related to course

const router = require("express").Router();
const enrolmentRequestcontroler = require("../controllers/enrollRequest");
const enrolmentcontroler = require("../controllers/enrolment");


//permissions middleware takes in the role which will be allowed for the route 
const {permissions} = require("../middleware/auth")
//this route takes course id as params this router is used to send requests of enrolment to the owner of the course 
router.post("/sendRequest/:id",permissions("student"),enrolmentRequestcontroler.sendRequest);
//this router is usd to show all the request that the logged in student has made
router.get("/showallsent",permissions("student"),enrolmentRequestcontroler.showallRequestsSentbyUser);
//the below router will take respose status as params it only shows the request that student has made but with a certain status response
router.get("/showallsent/:response",enrolmentRequestcontroler.showallRequestsSentbyUserwithResponse);
//this router shows all the request that the owner has recieved
router.get("/showallrecieved",permissions("teacher","principal"),enrolmentRequestcontroler.showallRequestsSenttoUser);
//the below router will take respose status as params
router.get("/showallrecieved/:response",enrolmentRequestcontroler.showallRequestsSenttoUserwithResponse);
//the below router take request _id as params
router.delete("/delete/:id",permissions("student"),enrolmentRequestcontroler.delete); //TODO - dont use end point like /delete/:id
//the below router take request _id as params
router.patch("/accept/:id",permissions("teacher","principal"),enrolmentcontroler.acceptRequest);
//the below router take request _id as params
router.patch("/reject/:id",permissions("teacher","principal"),enrolmentcontroler.rejectrequest);
//enable or disable the params here will take in the _id of course
router.patch("/enable/:id",permissions("teacher","principal"),enrolmentcontroler.enableanddisable); //TODO - this should only Enable not disable, create another API for disable

module.exports = router;
