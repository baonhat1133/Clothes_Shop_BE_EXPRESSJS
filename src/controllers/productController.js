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
    let { category_id, title, price, discount, image } = req.body;
    if (!category_id || !title || !price || !discount || !image) {
      return res.status(200).json({ message: "Missing input" });
    }
    await productMethod.createProduct(
      category_id,
      title,
      price,
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
    let { category_id, title, price, discount, image } = req.body;
    let id = req.params.id;
    if (!id || !category_id || !title || !price || !discount || !image) {
      return res.status(200).json({ message: "Missing input" });
    }
    await productMethod.updateProduct(
      id,
      category_id,
      title,
      price,
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

const productController = {
  getAllProductCtrl,
  getProductByIdCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  createProductCtrl,
};
export default productController;
