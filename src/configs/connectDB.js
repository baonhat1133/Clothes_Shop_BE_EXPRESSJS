import mysql from "mysql2/promise";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "clothes_shop",
  //password:'password'
});
export default pool;
