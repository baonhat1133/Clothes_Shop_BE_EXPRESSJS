import express from "express";
import authController from "../controllers/authController";
import middlewareController from "../controllers/middlewareController";
const router = express.Router();

let initAuthRoutes = (app) => {
  router.post("/register", authController.registerUser);
  router.post("/login", authController.loginUser);
  router.post("/refresh", authController.requestRefreshToken);
  router.post(
    "/logout",
    middlewareController.verifyToken || middlewareController.verifyTokenAdmin,
    authController.logoutUser
  );
  return app.use("/auth", router);
};

export default initAuthRoutes;
