import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import initAPIRoutes from "./routes/api";
import configCors from "./config/cors";
// import connection from "./config/connectDB";
require("dotenv").config();
const port = process.env.PORT || 8081;
const app = express();
// config cors
configCors(app);
configViewEngine(app);
// configBodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// init all web routes
initWebRoutes(app);
initAPIRoutes(app);
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
