import express from "express";
import {
  getHomePage,
  getAdminPage,
  getUserPage,
} from "../controllers/getHomePage";
const router = express.Router();
import middlewareController from "../controllers/middlewareController";
let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/user", middlewareController.verifyToken, getUserPage);
  router.get("/admin", middlewareController.verifyTokenAdmin, getAdminPage);
  return app.use("/v1", router);
};

export default initWebRoutes;
