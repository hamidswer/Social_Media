import passport from "passport";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";

const PassportJWT = () => {
  dotenv.config();
  const JWTStrategy = passportJWT.Strategy;
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: (req) => req.cookies.jwt,
        secretOrKey: process.env.JWT_KEY,
      },
      (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
          return done("jwt expired");
        }

        return done(null, jwtPayload);
      }
    )
  );
};

export default PassportJWT;
