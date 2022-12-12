import passport from "passport";
import PassportGoogleSSO from "../../api/services/passport/PassportGoogleSSO.js";
import PassportLocal from "../../api/services/passport/PassportLocal.js";

const AuthenticatePassport = (app) => {
  // Passport authentication
  PassportLocal();
  PassportGoogleSSO();
  app.use(passport.initialize());
};
export default AuthenticatePassport;
