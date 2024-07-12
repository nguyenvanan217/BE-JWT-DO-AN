import mysql from "mysql2";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateUser = (req, res) => {
  const { email, password, username } = req.body;
  let hashPassword = bcrypt.hashSync(password, salt); //nhận vào password và mã hóa
  console.log(">>>>>>>>>>>>>>>>>hashPassword: ", hashPassword);
  let check = bcrypt.compareSync(password,  hashPassword); //so sánh pass người ta nhập vào với mã hóa nếu đúng là true
  console.log(">>>>>>>>>>>>>>>>>check: ", check);
  // connection.query(
  //   "INSERT INTO users (email, password, username) VALUES (?, ?, ?);",
  //   [email, password, username],
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log("error: ", err);
  //     }
  //   }
  // );
  return res.send("handleCreateUser");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateUser,
};
