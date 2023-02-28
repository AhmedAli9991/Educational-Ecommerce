
//Eror handling middleware 
module.exports.errorHandler = (err, req, res, next) => {
  //TODO- Check other Error type and handle those as well,
  if(!err.status)
  res.status(500).json({error:err.message}); //Correct this ERROR must be generic, not Just 500!
  else res.status(err.status).json({error:err.message});
};
