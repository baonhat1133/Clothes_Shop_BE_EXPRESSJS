import express from "express";
import productController from "../controllers/productController";
import middlewareController from "../controllers/middlewareController";

const router = express.Router();
let initHandleProduct = (app) => {
  router.get("/getAllPrds", productController.getAllProductCtrl);
  router.get("/getAllPrds/:id", productController.getProductByIdCtrl);
  router.post(
    "/createPrd",
    middlewareController.verifyTokenAdmin,
    productController.createProductCtrl
  );
  router.put(
    "/updateProduct/:id",
    middlewareController.verifyTokenAdmin,
    productController.updateProductCtrl
  );
  router.delete(
    "/deleteProduct/:id",
    middlewareController.verifyTokenAdmin,
    productController.deleteProductCtrl
  );

  /* ORDER==================================== */
  router.get("/getAllOrder/:user_id", productController.getAllOrderCtrl);
  router.post(
    "/createOrder",
    middlewareController.verifyToken,
    productController.createOrderCtrl
  );
  router.put(
    "/updateOrderAdmin/:user_id",
    middlewareController.verifyTokenAdmin,
    productController.updateOrderCtrl
  );
  router.put(
    "/updateOrder/:user_id",
    middlewareController.verifyToken,
    productController.updateOrderCtrl
  );
  return app.use("/product", router);
};
export default initHandleProduct;
