import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

const SecureApi = (app) => {
  app.disable("X-Powered-By");
  app.use(helmet());
  //  rate limiter 100 request per 10 minutes
  const limiter = rateLimit({
    max: 10000,
    //  milisecounds
    windowMs: 10 * 60 * 1000,
    message: "tooMuchRequest",
  });
  app.use("/", limiter);
  // Data sanitization against noSQL query injection
  app.use(mongoSanitize());

  //  Data sanitization against xss attack
  app.use(xss());

  // // Preventing parameter pollution
  // app.use(
  //   hpp({
  //     whitelist: [
  //       "duration",
  //       "ratingsQuantity",
  //       "ratingsAverage",
  //       "maxGroupSize",
  //       "cookTime",
  //       "price",
  //     ],
  //   })
  // );
};
export default SecureApi;
