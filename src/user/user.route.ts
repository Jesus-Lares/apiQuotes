import express from "express";

import UserController from "./user.controller";
import md_auth from "../middleware/authenticated";
import { alterUser } from "../middleware/alterTables";

const api = express.Router();

api.get("/users", [md_auth, alterUser], UserController.users);
api.post("/login", UserController.signUp);
api.get("/login", UserController.signIn);
api.get("/user/:id", [md_auth, alterUser], UserController.getMe);
api.put("/user/:id", [md_auth, alterUser], UserController.updateUser);
api.delete("/user/:id", [md_auth, alterUser], UserController.deleteUser);

export default api;
