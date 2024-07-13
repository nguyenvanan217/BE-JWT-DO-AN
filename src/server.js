import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
// import connection from "./config/connectDB";
require("dotenv").config();
const port = process.env.PORT || 8081;
const app = express();

configViewEngine(app);

// configBodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// test connect đb
// connection();
initWebRoutes(app);

app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
