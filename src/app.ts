import express from "express";
import dotenv from "dotenv-safe";

import userRoutes from "./user/user.route";

function init() {
  dotenv.config();
  const app = express();

  const port = process.env.PORT || 3000;
  const API_VERSION = process.env.API_VERSION;

  app.use(`/api/${API_VERSION}`, userRoutes);

  app.listen(port, () => {
    console.log("##############");
    console.log("###API REST###");
    console.log("##############");
    console.log("App is running in the port " + port);
  });
}

init();
