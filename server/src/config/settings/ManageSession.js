import session from "express-session";
import cookieParser from "cookie-parser";

const ManageSession = (app) => {
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      domain: process.env.CLIENT_DOMAIN,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
    })
  );
};
export default ManageSession;
