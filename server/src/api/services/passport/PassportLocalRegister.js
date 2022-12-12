import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import PassportLocal from "./PassportLocal.js";

const PassportLocalRegister = (req, res) => {
  dotenv.config();
  PassportLocal();
  passport.authenticate("local", { session: false }, (error, user) => {
    try {
      if (error || !user) {
        res.status(400).json({ error });
      }
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
        res.status(200).send({ user });
      });
    } catch (error) {
      console.log(error);
    }
  })(req, res);
};
export default PassportLocalRegister;
