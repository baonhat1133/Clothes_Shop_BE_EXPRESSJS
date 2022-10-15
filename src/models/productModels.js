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
let createProduct = async (
  category_id,
  title,
  price,
  amount,
  discount,
  image
) => {
  await pool.execute(
    "INSERT INTO product (category_id, title, price, amount, discount, image) VALUES (?,?,?,?,?,?);",
    [category_id, title, price, amount, discount, image]
  );
};
let updateProduct = async (
  id,
  category_id,
  title,
  price,
  amount,
  discount,
  image
) => {
  await pool.execute(
    "UPDATE product SET category_id =?, title =?, price =?,amount=?, discount =?, image =? WHERE id=?;",
    [category_id, title, price, amount, discount, image, id]
  );
};
let deleteProduct = async (id) => {
  await pool.execute("DELETE FROM product WHERE id=?", [id]);
};

let createOrder = async (
  user_id,
  fullname,
  email,
  phone_number,
  address,
  total_product,
  status,
  total_money
) => {
  await pool.execute(
    "INSERT INTO orders (user_id, fullname, email, phone_number, address, total_product, status, total_money) VALUES (?,?,?,?,?,?,?,?);",
    [
      user_id,
      fullname,
      email,
      phone_number,
      address,
      total_product,
      status,
      total_money,
    ]
  );
};
let getAllOrder = async (user_id) => {
  if (user_id === "All") {
    let [order, ...other] = await pool.execute("SELECT * FROM orders");
    return order;
  } else {
    let [order, ...other] = await pool.execute(
      "SELECT * FROM orders WHERE user_id=?",
      [user_id]
    );
    return order;
  }
};
let updateOrder = async (
  user_id,
  fullname,
  email,
  phone_number,
  address,
  total_product,
  status,
  total_money
) => {
  await pool.execute(
    "UPDATE orders SET fullname=?, email=?, phone_number=?, address=?, total_product=?, status=?, total_money=? WHERE user_id=?;",
    [
      fullname,
      email,
      phone_number,
      address,
      total_product,
      status,
      total_money,
      user_id,
    ]
  );
};

const productMethod = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  createOrder,
  getAllOrder,
  updateOrder,
};
export default productMethod;
