import pool from "../models/connectDB";

let getHomePage = async (req, res) => {
  const [rows, field] = await pool.execute("select * from role");
  return res.send(`success homepage!!! ${JSON.stringify(rows)}`);
};
let getAdminPage = (req, res) => {
  return res.status(200).json("You're welcome ADMIN !!!");
};
let getUserPage = (req, res) => {
  return res.status(200).json("You're welcome USER !!!");
};
export { getHomePage, getAdminPage, getUserPage };
