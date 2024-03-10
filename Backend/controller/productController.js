const { productModel } = require("../model/productModel.js");
const ApiFeature = require("../utils/Apifeatures.js");
const Errorhandler = require("../utils/errorHandler.js");
const { catchAsyncError } = require("../utils/middlewares.js");

// create a products

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const newProduct = await productModel.create(req.body);

  return res.status(201).json({
    success: true,
    product: newProduct,
  });
});

// get all products

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;

  const apifeatures = new ApiFeature(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apifeatures.query;

  if (!products) return next(new Errorhandler(404, "Products not found"));

  // countDocument no of products
  const productCount = await productModel.countDocuments({});
  return res.status(200).json({
    success: true,
    totalProducts: productCount,
    products,
  });
});

//get a product

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (product) {
    return res.status(200).json({
      success: true,
      product,
    });
  } else {
    return next(new Errorhandler(404, "Product not found in stack"));
  }
});

// update the product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(
      new Errorhandler(404, "Product not found so sorry we cannot update it")
    );
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(202).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product)
    return next(new Errorhandler(404, "Product not Available in the stack"));

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});
