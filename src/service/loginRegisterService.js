import { where } from "sequelize/lib/sequelize";
import db from "../models/index.js";
import bcrypt, { hash } from "bcryptjs";
import { Op } from "sequelize";
const salt = bcrypt.genSaltSync(10);
// người dùng nhập vào tham số userPassword
const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: {
      email: userEmail,
    },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: {
      phone: userPhone,
    },
  });
  if (user) {
    return true;
  }
  return false;
};
const registerNewUser = async (rawUserData) => {
  try {
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: "1",
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist",
        EC: "1",
      };
    }

    //hashPassword
    let hashPassword = hashUserPassword(rawUserData.password);
    //create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
    });
    return {
      EM: "A user is created successfully ",
      EC: 0,
    };
  } catch (error) {
    console.log("e");
    return {
      EM: "Something wrongs in service....",
      EC: "-2",
    };
  }
};
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};
const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        return {
          EM: "ok!",
          EC: 0,
          DT: "",
        };
      }
    }
    return {
      EM: "Your email/phone number or password is incorrect",
      EC: 1,
      DT: "",
    };
    // console.log(">>>>>>>>>check user js", user.get({ plain: true }));
    // console.log(">>>>>>>>>check user sequelize", user);

    // let isCorrectPassword = checkPassword;
    // if (isPhoneExist === false) {
    //   return {
    //     EM: "The phone is already exist",
    //     EC: "1",
    //     DT: "",
    //   };
    // }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service....",
      EC: "-2",
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  checkEmailExist,
  hashUserPassword,
  checkPhoneExist,
};

