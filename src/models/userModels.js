import pool from "../configs/connectDB";

let getUserByEmail = async (email) => {
  let [user, ...other] = await pool.execute(
    "SELECT * FROM user WHERE email =?",
    [email]
  );
  return user || [];
};
let getAllUser = async () => {
  let [allUser, ...other] = await pool.execute("SELECT * FROM user");
  return allUser;
};
let createUser = async (fullname, email, phone_number, password, role_id) => {
  await pool.execute(
    "insert into user (fullname, email, phone_number, password, role_id) values (?,?,?,?,?)",
    [fullname, email, phone_number, password, role_id]
  );
};

const databaseMethod = {
  getUserByEmail,
  createUser,
  getAllUser,
};
export default databaseMethod;
