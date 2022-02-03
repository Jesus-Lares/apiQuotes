import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { messageUser, RoleUser } from "../config/constants";
import JWT from "../lib/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: false,
      message: "La peticion no tiene cabecera de autenticacion.",
    });
  }

  const token = req.headers.authorization;
  let info = new JWT().verify(token);
  if (info === messageUser.TOKEN_VERICATION_FAILED) {
    return res.status(400).send({ status: false, message: info });
  }

  if (Object.values(info)[3] <= new Date().toISOString()) {
    return res.status(404).send({ message: "El token ha expirado" });
  }
  const checkRole = bcrypt.compareSync(
    RoleUser.admin,
    Object.values(info)[0].role
  );

  req.userRole = checkRole ? RoleUser.admin : RoleUser.client;
  req.userId = Object.values(info)[0].id;
  next();
};
