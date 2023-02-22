
//Eror handling middleware 
module.exports.errorHandler = (err, req, res, next) => {
  if(!err.status)
  res.status(500).json({error:err.message}); //Correct this ERROR must be generic
  else res.status(err.status).json({error:err.message});
};
