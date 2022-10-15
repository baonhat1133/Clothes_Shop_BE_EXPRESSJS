import productMethod from "../models/productModels";
// get all product

let getAllProductCtrl = async (req, res) => {
  try {
    let productAll = await productMethod.getAllProducts();
    return res
      .status(200)
      .json({ message: "Success get all product", data: productAll });
  } catch (err) {
    return res.status(500).json(err);
  }
};
//get product by id
let getProductByIdCtrl = async (req, res) => {
  try {
    let product = await productMethod.getProductById(req.params.id);
    return res
      .status(200)
      .json({ message: "Success Get product by id", data: product });
  } catch (err) {
    return res.status(500).json(err);
  }
};
//create new product
let createProductCtrl = async (req, res) => {
  try {
    let { category_id, title, price, amount, discount, image } = req.body;
    if (!category_id || !title || !price || !amount || !discount || !image) {
      return res.status(200).json({ message: "Missing input" });
    }
    await productMethod.createProduct(
      category_id,
      title,
      price,
      amount,
      discount,
      image
    );
    return res.status(200).json({ message: "Success Create Product" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
//update product
let updateProductCtrl = async (req, res) => {
  try {
    let { category_id, title, price, amount, discount, image } = req.body;
    let id = req.params.id;
    if (
      !id ||
      !category_id ||
      !title ||
      !price ||
      !amount ||
      !discount ||
      !image
    ) {
      return res.status(200).json({ message: "Missing input" });
    }
    await productMethod.updateProduct(
      id,
      category_id,
      title,
      price,
      amount,
      discount,
      image
    );
    return res.status(200).json({ message: "Success Update Product" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
//delete product
let deleteProductCtrl = async (req, res) => {
  try {
    let id = req.params.id;
    await productMethod.deleteProduct(id);
    return res.status(200).json({ message: "Success Delete Product" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//ORDER ------------------------------------------------------------------

let createOrderCtrl = async (req, res) => {
  try {
    let {
      user_id,
      fullname,
      email,
      phone_number,
      address,
      total_product,
      status,
      total_money,
    } = req.body;
    await productMethod.createOrder(
      user_id,
      fullname,
      email,
      phone_number,
      address,
      total_product,
      status,
      total_money
    );
    return res.status(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};
let getAllOrderCtrl = async (req, res) => {
  try {
    let order = await productMethod.getAllOrder(req.params.user_id);
    return res
      .status(200)
      .json({ message: "Success Get order by id", data: order });
  } catch (err) {
    return res.status(500).json(err);
  }
};

let updateOrderCtrl = async (req, res) => {
  try {
    let {
      user_id,
      fullname,
      email,
      phone_number,
      address,
      total_product,
      status,
      total_money,
    } = req.body;
    let id = req.params.user_id;
    if (
      !id ||
      !user_id ||
      !fullname ||
      !email ||
      !phone_number ||
      !address ||
      !total_product ||
      !status ||
      !total_money
    ) {
      return res.status(200);
    }
    await productMethod.updateOrder(
      user_id,
      fullname,
      email,
      phone_number,
      address,
      total_product,
      status,
      total_money
    );
    return res.status(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const productController = {
  getAllProductCtrl,
  getProductByIdCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  createProductCtrl,
  createOrderCtrl,
  getAllOrderCtrl,
  updateOrderCtrl,
};
export default productController;
