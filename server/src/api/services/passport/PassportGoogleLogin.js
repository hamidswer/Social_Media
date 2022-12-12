import passport from "passport";
const PassportGoogleLogin = passport.authenticate("google", {
  session: false,
  scope: ["profile", "email"],
});
export default PassportGoogleLogin;
