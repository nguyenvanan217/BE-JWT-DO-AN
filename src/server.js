import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
const port = process.env.PORT || 8081;
const app = express();

configViewEngine(app);

initWebRoutes(app);

app.listen(port, () => {
    console.log(`App is running at the port ${process.env.PORT}`);
});