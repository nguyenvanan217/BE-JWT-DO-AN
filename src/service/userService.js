import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import Bluebird from "bluebird";
// Create the connection to database

const salt = bcrypt.genSaltSync(10);
// người dùng nhập vào tham số userPassword
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?);",
      [email, hashPass, username]
    );
  } catch (error) {
    console.log(">>>>>>>>>>>>>>>>>>>>error: ", error);
  }
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });
  try {
    const [rows, fields] = await connection.execute("Select * From users");
    return rows;
  } catch (err) {
    console.log(">>>>>>>>>>>>>>>>>>>>err: ", err);
  }
};
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(">>>>>>>>>>>>>>>>>>>>error: ", error);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
};
