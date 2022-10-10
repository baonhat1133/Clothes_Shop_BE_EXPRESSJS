import pool from "../configs/connectDB";

let getAllProducts = async () => {
  let [products, ...other] = await pool.execute("SELECT * FROM product;");
  return products;
};
let getProductById = async (id) => {
  let [productId, ...other] = await pool.execute(
    "SELECT * FROM product WHERE id=?",
    [id]
  );
  return productId;
};
let createProduct = async (category_id, title, price, discount, image) => {
  await pool.execute(
    "INSERT INTO product (category_id, title, price, discount, image) VALUES (?,?,?,?,?);",
    [category_id, title, price, discount, image]
  );
};
let updateProduct = async (id, category_id, title, price, discount, image) => {
  await pool.execute(
    "UPDATE product SET category_id =?, title =?, price =?, discount =?, image =? WHERE id=?;",
    [category_id, title, price, discount, image, id]
  );
};
let deleteProduct = async (id) => {
  await pool.execute("DELETE FROM product WHERE id=?", [id]);
};

const productMethod = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
export default productMethod;
