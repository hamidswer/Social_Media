import passport from "passport";
import PassportJWT from "../../services/passport/PassportJWT.js";
PassportJWT();
const Protected = passport.authenticate("jwt", { session: false });
export default Protected;
