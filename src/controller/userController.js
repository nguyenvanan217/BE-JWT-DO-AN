import userApiService from "../service/userApiService";
const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      console.log(">>>>>>>>>check", req.query);
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await userApiService.getUserWidthPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, //ERROR MESS
        EC: data.EC, //ERROR CODE
        DT: data.DT, //DATA
      });
    } else {
      let data = await userApiService.getAllUser();
      return res.status(200).json({
        EM: data.EM, //ERROR MESS
        EC: data.EC, //ERROR CODE
        DT: data.DT, //DATA
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const createFunc = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const updateFunc = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const deleteFunc = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
