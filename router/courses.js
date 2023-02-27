//All the Routes related to course

const router = require("express").Router();
const coursecontroler = require("../controllers/courses");

//verifyToken middleware that decodes the JWT and gets the users attributes

//permissions middleware takes in the role which will be allowed for the route 
const {verifyToken,permissions} = require("../middleware/auth")

router.post("/create",permissions("principal","teacher"),coursecontroler.add);
router.get("/showall",coursecontroler.showall);
router.get("/showone/:id",coursecontroler.viewOne);
router.delete("/delete/:id",permissions("principal","teacher"),coursecontroler.delete);
router.patch("/update/:id",permissions("principal","teacher"),coursecontroler.update);

module.exports = router;
