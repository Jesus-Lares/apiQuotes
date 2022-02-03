import { NextFunction, Request, Response } from "express";
import { Collections, RoleUser } from "../config/constants";
import { findElementById } from "../lib/db-operations";

export const alterUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.userRole === RoleUser.admin || parseInt(req.params.id) === req.userId)
    next();
  else
    return res.status(400).send({
      status: false,
      message: "No tiene permisos para realizar esta acción",
    });
};
export const alterQuote = (req: Request, res: Response, next: NextFunction) => {
  if (req.userRole === RoleUser.admin) next();

  findElementById(
    Collections.quotes,
    parseInt(req.params.id),
    (err, results) => {
      if (err)
        return res.status(400).send({
          status: false,
          message:
            "Error al realizar la petición. Comprueba que tienes corretamente todo",
        });
      if (results[0]?.idUser === req.userId) next();
      else
        return res.status(400).send({
          status: false,
          message: "No tiene permisos para realizar esta acción",
        });
    }
  );
};
