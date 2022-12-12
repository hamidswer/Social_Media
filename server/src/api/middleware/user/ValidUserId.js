import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const ValidUserId = async (req, res, next) => {
  dotenv.config();
  const token = jwt.verify(req.cookies.jwt, process.env.JWT_KEY);
  const userId = await token.userId;
  req.body.validUserId = userId;
  const id = await req.params.id;
  if (id === userId) {
    next();
  } else {
    res.status(500).json({ message: "Access denied!" });
  }
};

export default ValidUserId;
