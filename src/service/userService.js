import bcrypt from "bcryptjs";
// import Bluebird from "bluebird";
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
  //test relationships
  // let newUser = await db.User.findOne({
  //   where: { id: 1 },
  //   attributes: ["id", "username", "email"],
  //   include: { model: db.Group, attributes: ["name", "description"] },
  //   raw: true,
  //   nest: true,
  // });
  // console.log(">>>>>>>>>>>>>>>>>>>>new User: ", newUser);

  // let roles = await db.Group.findOne({
  //   where: { id: 1 },
  //   include: { model: db.Role },
  //   raw: true,
  //   nest: true,
  // });
  // let r = await db.Role.findAll({
  //   include: { model: db.Group, where: { id: 1 } }, // lấy thằng mọi thằng role mô có điều kiện ở Group có id là 1
  //   raw: true,
  //   nest: true,
  // });
  // console.log(">>>>>>>>>>>>>>>>>>>>new User: ", newUser);
  // console.log(">>>>>>>>>>>>>>>>>>>>new Roles: ", r);
  let users = [];
  users = await db.User.findAll();
  return users;
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: Bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute("Select * From user");
  //   return rows;
  // } catch (err) {
  //   console.log(">>>>>>>>>>>>>>>>>>>>err: ", err);
  // }
};
const deleteUser = async (userId) => {
  await db.User.destroy({
    where: {
      id: userId,
    },
  });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: Bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id = ?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>>>>>>>>>>>>>>>>>>>error: ", error);
  // }
};
const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user.get({ plain: true });
  //   const connection = await mysql.createConnection({
  //     host: "localhost",
  //     user: "root",
  //     database: "jwt",
  //     Promise: Bluebird,
  //   });
  //   try {
  //     const [rows, fields] = await connection.execute(
  //       "select * FROM user WHERE id = ?",
  //       [id]
  //     );
  //     return rows;
  //   } catch (error) {
  //     console.log(">>>>>>>>>>>>>>>>>>>>error: ", error);
  //   }
};
const updateUserInfor = async (id, email, username) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: { id: id },
    }
  );
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: Bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user SET email = ?, username = ? WHERE id = ?",
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>>>>>>>>>>>>>>>>>>>error: ", error);
  // }
  // Change everyone without a last name to "Doe"
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
