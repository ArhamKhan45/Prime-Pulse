const dotenv = require("dotenv");
const app = require("./app.js");
const { dbconnect } = require("./config/dbConnect.js");

// uncaught error handler
process.on("uncaughtException", (err) => {
  console.log("Error : " + err.message);
  console.log("Shutting down the server due to  // uncaught error handler  ");
  process.exit(1);
});

//dotenv connect

dotenv.config({ path: "Backend/config/config.env" });

// database connect
dbconnect();
// console.log(youtube);
// creating the  server

const server = app.listen(process.env.PORT, (err) => {
  !err
    ? console.log(
        `Server is working successfully on http://${process.env.HOSTNAME}:${process.env.PORT}/`
      )
    : console.log("Something went wrong ", err);
});

//unhandled Promise rejection mongodb string error
process.on("unhandledRejection", (err) => {
  console.log("Error : " + err.message);
  console.log(
    "Shutting down the server due to unhandled Promise Rejection / Unhandled Rejection  "
  );
  server.close(() => process.exit(1));
});
