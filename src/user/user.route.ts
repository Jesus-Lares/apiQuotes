import UserController from "./user.controller";

const express = require("express");

const api = express.Router();

api.get("/users", UserController.users);

export default api;
