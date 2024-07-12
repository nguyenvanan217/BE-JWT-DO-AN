import express from "express";

const router = express.Router();
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        res.send("home");
    });
    router.get("/news", (req, res) => {
        res.send("news");
    });
    return app.use("/", router);
};
export default initWebRoutes;
