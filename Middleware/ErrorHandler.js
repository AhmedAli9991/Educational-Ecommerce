
//Eror handling middleware 
module.exports.ErrorHandler = (err, req, res, next) => {
  res.status(500).json("Oops, something went wrong.");
};
