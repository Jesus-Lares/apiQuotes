import { NextFunction, Request, Response } from "express";
import { errorsUser } from "../config/constants";
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
  if (info === errorsUser.TOKEN_VERICATION_FAILED) {
    return res.status(400).send({ status: false, message: info });
  }

  if (Object.values(info)[3] <= new Date().toISOString()) {
    return res.status(404).send({ message: "El token ha expirado" });
  }

  req.userId = Object.values(info)[0].id;
  req.userName = Object.values(info)[0].name;

  next();
};
