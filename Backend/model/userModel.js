const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const { serialise } = require("cookie-parser");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of user"],
    max: [30, "name cannot exceed 30 characters"],
    min: [3, "name should have 3 charactes"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please enter the username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please enter the Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter the valid Email"],
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  phoneno: {
    type: String,
    required: [true, "Please enter your phone no"],
    validate: [validator.isMobilePhone, "please enter the valid Phone no."],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// pre-save middleware
userSchema.pre("save", async function (next) {
  // checking password  modification
  !this.isModified("password") ? next() : "";

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN generation
userSchema.methods.JWTgenerateToken = function () {
  const unique_tokenid = uuid.v4();

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      name: this.name,
    },
    process.env.JWT_SECRETKEY,
    {
      jwtid: unique_tokenid,
      algorithm: "HS256",
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

//compare password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
