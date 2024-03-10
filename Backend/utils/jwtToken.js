// creating token and saving in cookie

exports.sendToken = (res, statuscode, message, route, user) => {
  let token, cookieoptions;
  if (route != "/logout") {
    token = user.JWTgenerateToken();
    cookieoptions = {
      maxAge: process.env.COOKIE_EXPIRE,
      httpOnly: true,
    };
  } else {
    token = undefined;
    cookieoptions = {
      maxAge: 0,
      httpOnly: true,
    };
  }

  //   cookie creation

  return res.status(statuscode).cookie("mycookie", token, cookieoptions).json({
    success: true,
    message: message,
    user,
    token,
    route,
  });
};
