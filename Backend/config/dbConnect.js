const mongoose = require("mongoose");
exports.dbconnect = async () => {
  return await mongoose.connect(process.env.db_url).then((data) => {
    console.log("Database connected successfully", data.connection.host);
  });
};
