import express from "express";

import UserController from "./user.controller";
import md_auth from "../middleware/authenticated";

const api = express.Router();

api.get("/users", UserController.users);
api.post("/sign-up", UserController.signUp);
api.get("/sign-in", UserController.signIn);
api.get("/get-me", [md_auth], UserController.getMe);

export default api;
