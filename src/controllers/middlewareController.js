import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
let verifyToken = (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid !!!");
      }
      req.user = user;
      next();
      return res.status(200).json("Login success !!!");
    });
  } else {
    return res.status(401).json("Not authenticated !!!");
  }
};

let verifyTokenAdmin = (req, res, next) => {
  let token = req.headers.token;
  const accessToken = token?.split(" ")[1];
  if (token) {
    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid for verifyToken!!!");
      }
      if (user.role === 1) {
        req.user = user;
        next();
      } else {
        return res.status(401).json("Sign in not Admin !!!");
      }
    });
  } else {
    return res.status(401).json("Not authenticated for verifyToken!!!");
  }
};
const middlewareController = {
  verifyToken: verifyToken,
  verifyTokenAdmin: verifyTokenAdmin,
};
export default middlewareController;
