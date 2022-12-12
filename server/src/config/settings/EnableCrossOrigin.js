import cors from "cors";
import dotenv from "dotenv";
const EnableCrossOrigin = (app) => {
  dotenv.config();
  app.enable("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CLIENT_DOMAIN,
      credentials: true,
      // methods: ["GET, POST, PUT, DELETE"],
    })
  );
};
export default EnableCrossOrigin;
