import express from "express";
import apiController from "../controller/apiController";
const router = express.Router();
/**
 * 
 * 
 * @param {*} app: express app
 */
const initAPIRoutes = (app) => {
  //rest API
  // GET=>Read , POST =>Create , PUT => Update , DELETE=>Delete
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  return app.use("/api/v1/", router);
};

export default initAPIRoutes;
