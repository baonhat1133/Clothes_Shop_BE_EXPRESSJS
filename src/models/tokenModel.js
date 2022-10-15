import pool from "../configs/connectDB";

let getAllToken = async (user_id) => {
  let [refreshtoken, ...other] = await pool.execute(
    "SELECT * FROM refreshtoken WHERE id=?;",
    [user_id]
  );
  return refreshtoken;
};

let createToken = async (id, token) => {
  await pool.execute(
    "insert into refreshtoken (id, refreshtoken) VALUES (?,?)",
    [id, token]
  );
};
let updateToken = async (id, token) => {
  await pool.execute("UPDATE product SET refreshtoken=? WHERE id=?;", [
    token,
    id,
  ]);
};
let deleteToken = async (id) => {
  await pool.execute("DELETE FROM refreshtoken WHERE id=?", [id]);
};

const tokenMethod = {
  getAllToken,
  createToken,
  updateToken,
  deleteToken,
};
export default tokenMethod;
