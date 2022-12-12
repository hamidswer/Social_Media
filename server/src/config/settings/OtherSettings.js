import bodyParser from "body-parser";
import compression from "compression";
import express from "express";

const OtherSettings = (app) => {
  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
  app.use(express.json());
};
export default OtherSettings;
