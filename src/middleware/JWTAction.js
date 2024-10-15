require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log("error createJWT", error);
  }
  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log("err from verifyToken", error);
  }
  return data;
};
module.exports = {
  createJWT,
  verifyToken,
};
