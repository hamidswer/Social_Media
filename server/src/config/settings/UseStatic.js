import path from "path";
import express from "express";
import dotenv from "dotenv";

const UseStatic = (app) => {
  dotenv.config();
  // to serve images inside public folder
  const __dirname = path.resolve();
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));
  app.use(
    "/images",
    express.static(path.join(__dirname, process.env.PUBLIC_FOLDER + "/images"))
  );
  app.use(
    "/videos",
    express.static(path.join(__dirname, process.env.PUBLIC_FOLDER + "/videos"))
  );
};
export default UseStatic;
