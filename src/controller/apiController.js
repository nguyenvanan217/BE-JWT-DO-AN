import loginRegisterService from "../service/loginRegisterService";
const testApi = async (req, res) => {
  return res.status(200).json({
    message: "OK",
    data: "test API",
  });
};

const handleRegister = async (req, res) => {
  try {
    // email,
    // phone,
    // username,
    // password,
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters", //ERROR MESS
        EC: "1", //ERROR CODE
        DT: "", //DATA
      });
    }
    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters", //ERROR MESS
        EC: "1", //ERROR CODE
        DT: "", //DATA
      });  
    }
    //service: create user
    let data = await loginRegisterService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM, //ERROR MESS
      EC: data.EC, //ERROR CODE
      DT: "", //DATA
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server", //ERROR MESS
      EC: "-1", //ERROR CODE
      DT: "", //DATA
    });
  }
};
module.exports = {
  testApi,
  handleRegister,
};
