import express from "express";
import configViewEngine from "./configs/configViewEngine";
import initWebRoutes from "./route/web";
import initAuthRoutes from "./route/auth";
import initHandleProduct from "./route/product";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(cookieParser());
configViewEngine(app);
initWebRoutes(app);

initAuthRoutes(app);

initHandleProduct(app);
app.listen(port, () => {
  console.log("listening on port:", port);
});
