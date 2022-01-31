import express from "express";

import UserController from "./user.controller";
import md_auth from "../middleware/authenticated";

const api = express.Router();

api.get("/users", UserController.users);
api.post("/login", UserController.signUp);
api.get("/login", UserController.signIn);
api.get("/user", [md_auth], UserController.getMe);
api.put("/user", [md_auth], UserController.updateUser);
api.delete("/user/:id", [md_auth], UserController.deleteUser);

export default api;
