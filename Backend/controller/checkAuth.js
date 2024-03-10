const { catchAsyncError } = require("../utils/middlewares.js");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel.js");
const Errorhandler = require("../utils/errorHandler.js");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const mycookie = req.cookies.mycookie;

  if (!mycookie)
    return next(new Errorhandler(401, "Please Login to access this resource"));

  // verifying user details

  const decodedData = jwt.verify(mycookie, process.env.JWT_SECRETKEY);
  // console.log(decodedData);

  req.user = await userModel.findById(decodedData._id);
  return next();
});

// authorize role checking User is Admin or not
exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    console.log(roles);

    next();
  };
};
