import express from "express";
import productController from "../controllers/productController";
import middlewareController from "../controllers/middlewareController";

const router = express.Router();
let initHandleProduct = (app) => {
  router.get("/getAllPrds", productController.getAllProductCtrl);
  router.get("/getAllPrds/:id", productController.getProductByIdCtrl);
  router.post(
    "/createPrd",
    // middlewareController.verifyTokenAdmin,
    productController.createProductCtrl
  );
  router.put(
    "/updateProduct/:id",
    // middlewareController.verifyTokenAdmin,
    productController.updateProductCtrl
  );
  router.delete(
    "/deleteProduct/:id",
    // middlewareController.verifyTokenAdmin,
    productController.deleteProductCtrl
  );
  return app.use("/product", router);
};
export default initHandleProduct;
