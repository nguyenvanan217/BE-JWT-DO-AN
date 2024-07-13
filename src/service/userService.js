import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import Bluebird from "bluebird";
import db from "../models/index.js";
// Create the connection to database

const salt = bcrypt.genSaltSync(10);
// người dùng nhập vào tham số userPassword
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);
  try {
    await db.User.create({
        username: username,
        email: email,
        password: hashPass,
      });
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
    const [rows, fields] = await connection.execute("Select * From user");
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
      "DELETE FROM user WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(">>>>>>>>>>>>>>>>>>>>error: ", error);
  }
};
const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "select * FROM user WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(">>>>>>>>>>>>>>>>>>>>error: ", error);
  }
};
const updateUserInfor = async (id, email, username) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: Bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE user SET email = ?, username = ? WHERE id = ?",
      [email, username, id]
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
  getUserById,
  updateUserInfor,
};
