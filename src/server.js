import express from "express";
import configViewEngine from "./configs/configViewEngine";
import initWebRoutes from "./route/web";
import initAuthRoutes from "./route/auth";
import initHandleProduct from "./route/product";
import cookieParser from "cookie-parser";
import cors from "cors";
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cookieParser());
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded()); //{ extended: false }
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    // credentials: true,
    // exposedHeaders: ["set-cookie"],
  })
); //{credentials: true}

// app.use(
//   // "auth/refresh",
//   createProxyMiddleware({
//     target: "http://localhost:3000/", //original url
//     changeOrigin: true,
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//       proxyRes.headers["Access-Control-Allow-Origin"] = "*";
//     },
//   })
// );
configViewEngine(app);

initWebRoutes(app);

initAuthRoutes(app);

initHandleProduct(app);
app.listen(port, () => {
  console.log("listening on port:", port);
});
