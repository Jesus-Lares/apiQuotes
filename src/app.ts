import express from "express";
import * as dotenv from "dotenv";
(async () => {
  await dotenv.config();
})();

import userRoutes from "./user/user.route";
import quotesRoutes from "./quotes/quotes.route";
import shuffleRoutes from "./shuffle/shuffle.route";

function init() {
  const app = express();

  const port = process.env.PORT || 3000;
  const API_VERSION = process.env.API_VERSION;

  app.use(express.json());
  app.use(`/api/${API_VERSION}`, userRoutes);
  app.use(`/api/${API_VERSION}`, quotesRoutes);
  app.use(`/api/${API_VERSION}`, shuffleRoutes);
  app.get("/", (req, res) => {
    res.status(200).send("API QUOTES");
  });

  app.listen(port, () => {
    console.log("##############");
    console.log("###API REST###");
    console.log("##############");
    console.log("App is running in the port " + port);
  });
}

init();
