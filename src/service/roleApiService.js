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
        EC: 0,
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
module.exports = {
  createNewRoles,
};
