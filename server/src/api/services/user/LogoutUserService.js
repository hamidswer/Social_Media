import jwt from "jsonwebtoken";

const LogoutUserService = async () => {
  const payload = {
    expiresIn: "2s",
  };
  /** generate a signed json web token with wrong key and return it in the response */
  const token = jwt.sign(
    JSON.stringify(payload),
    "wrongSecretKeyForTemperingTheJWT"
  );
  return token;
};

export default LogoutUserService;
