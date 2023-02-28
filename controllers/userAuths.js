//User registration and authetication
const user = require("../db/models/user");
const verification = require("../db/models/verification");
const wallet = require("../db/models/wallet");

const bcrypt = require("bcrypt");
const { createJwt } = require("../utils/jwt");
const { validate } = require("../utils/validator");
const {createError}= require("../utils/error");
const {signupMail,resendpMail} = require("../utils/mails")
//user registration
module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

   const val =  validate(req.body,["name","email","password","role"] )
    if (!val.isValid){
      throw(createError(422,val.message))
    }
    const old = await user.findOne({ email });

    if (old&&old.status!="Deleted")throw(createError(409,"already exists"))  
    
    var newpassword = await bcrypt.hash(password, 12);
    const wall = await wallet.create({amount:0})

    const code = Math.floor(Math.random() * 9000 + 1000);
    // sends OTP to the email registered with 
    const sign =signupMail(email,code)
    const nevrifiaction  = await verification.create({      
      email,
      code
    });
    if(!old){
    const newu = await user.create({
      name,
      email,
      password: newpassword,
      role,
      wallet:wall
    });
    res.status(201).json(newu);}      
    else{
      const newu = await user.findByIdAndUpdate(
        old._id,{
          status:"Initial"
        }
      );
      res.status(201).json(newu);}
      
  } catch (err) {
    next(err);
  }
};

//controler that accepts code which is sent to user in email to validate the users email
module.exports.verification = async (req, res, next) => {
  try {
    const { email,code } = req.body; 
    const { isValid, message } = validate(req.body, ["email", "code"]);    
    if (!isValid) throw(createError(422,message));
    const old = await user.findOne({email});
    if(!old)throw createError(404,"no such email has been registered")
    if(old.status!="Initial")throw createError(404,"no such un verified user")
    const verify = await verification.findOne({      
      email,
      code
    });
    if(!verify){
      throw (createError(409,"invalid Code for the email"))
    }
    const verified  = await user.findOneAndUpdate({email},{status:"Active"},{new:true})
    await verification.deleteOne({_id:verify._id})
    res.status(200).json(verified)
  
  } catch (err) {
    next(err);
  }
};

//controler that resends code which is sent to user in email to validate the users email
module.exports.resend = async (req, res, next) => {
  try {
    const { email } = req.body; 
    const { isValid, message } = validate(req.body, ["email"]);
    if (!isValid) throw(createError(422,message));
    const verify = await verification.findOne({      
      email,     
    });
    if(!verify){
      throw (createError(409,"no such email pending verifcation"))
    }
    const code = Math.floor(Math.random() * 9000 + 1000);
    // sends OTP to the email registered with 
    const sign =resendpMail(email,code)
    const nevrifiaction  = await verification.findOneAndUpdate({email},{      
      email,
      code
    });
    res.status(200).json({message:"code has been resent to the email ID"})
  
  } catch (err) {
    next(err);
  }
};

//user login and authentication using JWTs
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body; 
    const { isValid, message } = validate(req.body, ["email", "password"]);
    if (!isValid) throw(createError(422,message));

    const old = await user.findOne({ email });
    if (!old) {
      throw(createError(404,"No such user registered"));
    }
    if (old.status=="Deleted") {
      throw(createError(404,"This Account has been deleted"));
    }
    if (old.status=="InActive") {
      throw(createError(404,"This Account has been deactivated please contact admin team"));
    }
    const match = await bcrypt.compare(password, old.password);
    if (!match) {
      throw(createError(401,"password not correct"));
    }

    //call to create JWT in Utils
    var AccessToken = createJwt({
      _id: old._id,
      email: old.email,
      role: old.role,
    });
    res.cookie("AccessToken", AccessToken, {
      maxAge: 1 * 60 * 60 * 1000, 
    });
    res.status(200).json({message:"Logged in"});
  } catch (err) {
    next(err);
  }
};

//logout and clear cookies
module.exports.logout = (req, res) => {
  try {
    const { AccessToken } = req.cookies;

    if (!AccessToken)
      next(createError(401,"not logged in"));

    res.clearCookie("AccessToken");
    res.status(200).json({message:"logged out"});
  } catch (err) {
    res.status(400).json({error:err}); 
  }
};
