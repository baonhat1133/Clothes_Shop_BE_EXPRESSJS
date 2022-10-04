import databaseMethod from "../models/mySQL";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
let refreshTokens = [];
let registerUser = async (req, res) => {
  console.log("registerUser", req.body);
  try {
    let { fullname, email, phone_number, password, role_id } = req.body;
    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(password, salt);
    if (!fullname || !email || !phone_number || !hashed || !role_id) {
      return res.status(200).json({
        message: "missing",
      });
    }
    databaseMethod.createUser(fullname, email, phone_number, hashed, role_id);
    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
//generate access/refresh token
let generateAccessToken = (user) => {
  let accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role_id,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "90s" }
  );
  return accessToken;
};

let generateRefreshToken = (user) => {
  let refreshToken = jwt.sign(
    {
      id: user.id,
      role: user.role_id,
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "365d" }
  );
  return refreshToken;
};
let loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await databaseMethod.getUserByEmail(email);
    if (user[0] === undefined) {
      return res.status(404).json("Wrong email !!!");
    }
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      res.status(404).json("Wrong password !!!");
    }
    if (user && validPassword) {
      const accessToken = generateAccessToken(user[0]);
      const refreshToken = generateRefreshToken(user[0]);
      refreshTokens.push(refreshToken);
      //lưu token vào cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        // path: "/admin",
        sameSite: "strict",
      });
      let { password, ...other } = user[0];
      res.status(200).json({ other, accessToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
let requestRefreshToken = (req, res) => {
  let refreshToken = req.headers.cookied;
  // req.cookies.refreshtoken;
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json("Refresh token not valid");
  }
  if (!refreshToken) {
    return res.status(401).json("Not authenticated");
  }
  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokens = refreshTokens.filter((rftoken) => rftoken !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    //lưu token vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      // path: "/auth/refresh",
      sameSite: "strict",
    });
    res.status(200).json({ accessToken_new: newAccessToken });
  });
};
let logoutUser = async (req, res) => {
  res.clearCookie("refreshToken");
  // refreshTokens = refreshTokens.filter(
  //   (token) => token !== req.cookies.refreshToken
  // );
  res.status(200).json("Logout success !!!");
};
const authController = {
  registerUser: registerUser,
  loginUser: loginUser,
  requestRefreshToken: requestRefreshToken,
  logoutUser: logoutUser,
};
export default authController;
