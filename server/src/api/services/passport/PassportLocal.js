import passport from "passport";
import passportLocal from "passport-local";
import userModel from "../../models/UserModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import UserModel from "../../models/UserModel.js";
import UserDirectory from "../../services/user/UserDirectory.js";
const PassportLocal = () => {
  dotenv.config();
  passport.use(
    new passportLocal.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await userModel.findOne({
            email: email,
          });
          if (user) {
            const validity = await bcrypt.compare(password, user.password);
            if (!validity) {
              done(null, false);
            } else {
              done(null, user);
            }
          } else {
            try {
              // Password validator!
              // if (req.body.password.length < 8) {
              //   done(null, false);
              // }
              const salt = await bcrypt.genSalt(10);
              const hashedPass = await bcrypt.hash(password, salt);
              req.body.password = hashedPass;
              let newUser = await new UserModel(req.body).save();
              UserDirectory(newUser._id.toHexString());
              done(null, newUser);
            } catch (error) {
              done(null, false);
            }
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

export default PassportLocal;
