//All the Routes related to course

const router = require("express").Router();
const coursecontroler = require("../controlers/courses");

//verifyToken middleware that decodes the JWT and gets the users attributes

//permissions middleware takes in the role which will be allowed for the route 
const {verifyToken,permissions} = require("../middleware/auth")

router.post("/create",verifyToken,permissions("principal","teacher"),coursecontroler.add);
router.get("/showall",verifyToken,coursecontroler.showall);
router.get("/showone/:id",verifyToken,coursecontroler.viewOne);
router.delete("/delete/:id",verifyToken,permissions("principal","teacher"),coursecontroler.delete);
router.patch("/update/:id",verifyToken,permissions("principal","teacher"),coursecontroler.update);

module.exports = router;
