import UserController from "./user.controller";

const express = require("express");

const api = express.Router();

api.get("/users", UserController.users);
api.post("/sign-up", UserController.signUp);

export default api;
