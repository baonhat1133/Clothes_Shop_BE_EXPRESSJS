import express from "express";
import authController from "../controllers/authController";
import middlewareController from "../controllers/middlewareController";
const router = express.Router();

let initAuthRoutes = (app) => {
  router.post("/register", authController.registerUser);
  router.post("/checkLogin", authController.checkLogin);
  // router.post("/loginRole",middlewareController.verifyToken)
  router.post(
    "/loginAdmin",
    middlewareController.verifyTokenAdmin,
    authController.loginAdmin
  );
  router.post("/refresh", authController.requestRefreshToken);
  router.post(
    "/logout",
    middlewareController.verifyToken || middlewareController.verifyTokenAdmin,
    authController.logoutUser
  );
  return app.use("/auth", router);
};

export default initAuthRoutes;
