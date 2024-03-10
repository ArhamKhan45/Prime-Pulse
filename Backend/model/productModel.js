const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter the description of the product"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the product"],
    min: [0, "Price cannot be negative"],
    max: [99999999, "Price cannot exceed 99999999"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating cannot be negative"],
    max: [5, "Rating cannot exceed 5"],
  },
  images: [
    {
      public_Id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the category of the product"],
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, "Please enter the stock of the product"],
    min: [0, "Stock cannot be negative"],
    max: [9999, "Stock cannot exceed 9999"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be between 1 and 5"],
        max: [5, "Rating must be between 1 and 5"],
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.productModel = mongoose.model("Product", productSchema);
