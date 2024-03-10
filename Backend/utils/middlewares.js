const cookieParser = require("cookie-parser");
const Errorhandler = require("./errorHandler");
const jwt = require("jsonwebtoken");

// error  errorMiddleware
exports.errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statuscode = err.statuscode || 500;

  // mongodb Id error
  if (err.name == "CastError") {
    const message = "Resource not found, Invalid " + err.path;
    err = new Errorhandler(400, message);
  }
  return res.status(err.statuscode).json({
    success: false,
    message: err.message,
    errStack: err.stack,
  });
};

// catch async error
exports.catchAsyncError = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
