import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserDirectory from "../user/UserDirectory.js";
const PassportGoogleCallback = (req, res) => {
  dotenv.config();
  passport.authenticate(
    "google",
    (error, user) => {
      try {
        if (error || !user) {
          res.status(400).json({ error });
        }

        UserDirectory(user._id.toHexString());

        /** This is what ends up in our JWT */
        const payload = {
          userId: user._id,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };

        /** assigns payload to req.user */
        req.login(payload, { session: false }, (error) => {
          if (error) {
            res.status(400).send({ error });
          }

          /** generate a signed json web token and return it in the response */
          const token = jwt.sign(JSON.stringify(payload), process.env.JWT_KEY);

          /** assign our jwt to the cookie */
          res.cookie("jwt", token, { httpOnly: true, secure: true });
          res.redirect(process.env.SUCCESS_LOGIN);
        });
      } catch (error) {
        console.log(error);
      }
    },
    {
      session: false,
    }
  )(req, res);
};
export default PassportGoogleCallback;
