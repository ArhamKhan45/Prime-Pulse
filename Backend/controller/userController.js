const userModel = require("../model/userModel");
const Errorhandler = require("../utils/errorHandler");
const { sendToken } = require("../utils/jwtToken");
const { catchAsyncError } = require("../utils/middlewares");

// register api
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, username, email, password, phoneno, gender } = req.body;

  const newUser = await userModel.create({
    name,
    username,
    email,
    password,
    phoneno,
    gender,
    avatar: {
      public_id: "this is the sample id",
      url: "uehdeuihdeuid",
    },
  });

  // automatic login after registeration

  // removing password from showing
  newUser.password = undefined;

  // get route
  const route = req.path;

  return sendToken(
    res,
    200,
    "Congratulations, your registration was successful! 🎉 Welcome to Prime Pulse",
    route,
    newUser
  );
});

// login api

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;

  // checking the user has registered or not

  if ((!email && !username) || !password)
    return next(
      new Errorhandler(400, "Please enter email / username & password")
    );

  const userFound = await userModel
    .findOne({
      $or: [{ username: username }, { email: email }],
    })
    .select("+password");
  if (!userFound) {
    return next(new Errorhandler(401, "invalid email / username or password "));
  }

  const isMatchedPassword = await userFound.comparePassword(password);

  if (!isMatchedPassword)
    return next(new Errorhandler(401, "invalid email / username or password "));

  // get route
  const route = req.path;
  // removing password from showing
  userFound.password = undefined;

  // creating token and saving in cookie
  return sendToken(
    res,
    200,
    "Congratulations, you have successfully logged in! Welcome back to Prime Pulse",
    route,
    userFound
  );
});

// logout api

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  const route = req.path;
  return sendToken(
    res,
    200,
    "Your account has been successfully logged out.",
    route,
    undefined
  );
});
