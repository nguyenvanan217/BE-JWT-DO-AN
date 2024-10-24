import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    res.render("index"); // render file index.ejs
  });
  router.get("/user", homeController.handleUserPage);
  router.post("/user/create-user", homeController.handleCreateUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);

  //rest API
  // GET=>Read , POST =>Create , PUT => Update , DELETE=>Delete
  router.get("/api/test-api", apiController.testApi);
  return app.use("/", router);
};

export default initWebRoutes;
