import passport from "passport";
import googlePassport from "passport-google-oauth20";
import UserModel from "../../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

const PassportGoogleSSO = () => {
  const GoogleStrategy = googlePassport.Strategy;
  const GOOGLE_CALLBACK_URL =
    "http://localhost:5000/auth/login/google/callback";
  let user;
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        const googleUser = {
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          googleId: profile.id,
        };
        try {
          const user = await UserModel.findOne({
            email: googleUser.email,
          });
          if (user) {
            done(null, user);
          } else {
            let newUser = await new UserModel(googleUser).save();
            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    delete user?.password;
    done(null, user._id);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default PassportGoogleSSO;
