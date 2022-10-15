import databaseMethod from "../models/userModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import tokenMethod from "../models/tokenModel";
dotenv.config();
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
    { expiresIn: "25d" }
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

let checkLogin = async (req, res) => {
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
      //lưu token vào cookie/DB
      await tokenMethod.createToken(user[0].id, refreshToken);
      // res.cookie("refreshtoken", refreshToken, {
      //   httpOnly: true,
      //   // secure: false,
      //   // path: "/admin",
      //   // sameSite: "strict",
      // });

      let { password, ...other } = user[0];
      return res.status(200).json({ other, accessToken, refreshToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
let requestRefreshToken = async (req, res) => {
  let refresh_userId = req.body; // sent refresh token and userId {user_id, refreshtoken}
  let refreshTokenDB = await tokenMethod.getAllToken(refresh_userId.user_id); //gửi cái refreshtoken vào để nó verify [{}]
  console.log("database", refreshTokenDB);
  console.log("refresh_userId body", refresh_userId);
  // req.cookies.refreshtoken;
  let checkEmty = refreshTokenDB.some((token) => {
    return token.id === refresh_userId.user_id;
  });
  if (!refreshTokenDB[0]) {
    return res.status(403).json("Refresh token not valid");
  }
  if (!refresh_userId) {
    return res.status(401).json("Not authenticated");
  }
  jwt.verify(
    refresh_userId.refreshToken,
    process.env.REFRESH_SECRET_KEY,
    async (err, user) => {
      if (err) {
        console.log(err);
      }
      // refreshTokens = refreshTokens.filter((rftoken) => rftoken !== refreshToken);
      await tokenMethod.deleteToken(user.id);
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      // refreshTokens.push(newRefreshToken);
      await tokenMethod.createToken(user.id, newRefreshToken);

      return res
        .status(200)
        .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    }
  );
};
// let loginAdmin = (req, res) => {
//   return res
//     .status(200)
//     .json({ message: "Welcome Admin !!!", checkAdmin: true });
// };

let logoutUser = async (req, res) => {
  let id = req.params.user_id;
  await tokenMethod.deleteToken(id);
  return res.status(200);
};

let getAllUser = async (req, res) => {
  try {
    let allUser = await databaseMethod.getAllUser();
    res.status(200).json({ message: "Get All User Success", data: allUser });
  } catch (err) {
    res.status(500).json(err);
  }
};
const authController = {
  registerUser: registerUser,
  checkLogin: checkLogin,
  requestRefreshToken: requestRefreshToken,
  logoutUser: logoutUser,
  // loginAdmin: loginAdmin,
  getAllUser: getAllUser,
};
export default authController;
