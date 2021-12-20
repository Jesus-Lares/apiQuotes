import express, { Request, Response } from "express";
//import mysql from "mysql";

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("##############");
  console.log("###API REST###");
  console.log("##############");
  console.log("App is running");
});
