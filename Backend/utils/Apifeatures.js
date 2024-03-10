class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    let keyword = this.queryStr.keyword;

    keyword = keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // removing fields for category

    const removefields = ["keyword", "page", "limit"];
    removefields.forEach((key) => {
      delete queryCopy[key];
    });

    // filter on the basis of category

    // price and rating filter set

    let price = queryCopy.price;
    if (price) {
      price = JSON.stringify(price);
      price = price.replace(/\b(gt|gte|lt|lte)\b/g, (key) => "$" + key);
      queryCopy.price = JSON.parse(price);
    }

    this.query = this.query.find({ ...queryCopy });
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeature;

// limit() skip() both are Functions of mongodb
