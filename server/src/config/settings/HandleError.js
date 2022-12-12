import dotenv from "dotenv";
const HandleError = (server) => {
  dotenv.config();
  // this code should be here before any of our application code(app) to catch errors
  process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("Uncaught Exception so we shutting down the app");
    server.close(() => {
      process.exit(1);
    });
  });

  process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection so we shutting down the app");
    server.close(() => {
      process.exit(1);
    });
  });
};
export default HandleError;
