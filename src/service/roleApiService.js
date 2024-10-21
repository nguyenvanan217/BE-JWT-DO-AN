import db from "../models/index";
const createNewRoles = async (roles) => {
  try {
    // const testarr = [
    //     {url: 'test1',description: 'abc'},
    //     {url: '/user/update',description: 'abc'}
    // ]
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    // const results = testarr.filter(({ url: url1 }) =>
    // !currentRoles.some(({ url: url2 }) => url1 === url2));
    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );
    if (persists.length === 0) {
      return {
        EM: "Nothing to create...",
        EC: -1,
        DT: [],
      };
    }
    await db.Role.bulkCreate(persists);
    return {
      EM: `Create success ${persists.length} roles...`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service !",
      EC: 1,
      DT: [],
    };
  }
};
const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      order: [["id", "DESC"]],
    });
    return {
      EM: "Get all role success !",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong width service !",
      EC: 1,
      DT: [],
    };
  }
};
const deleteRole = async (id) => {
  try {
    let Role = await db.Role.findOne({
      where: { id: id },
    });
    if (Role) {
      await Role.destroy();
      return {
        EM: "Delete Role Successeds !",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Role not exist !",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service !",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  createNewRoles,
  getAllRoles,
  deleteRole,
};
