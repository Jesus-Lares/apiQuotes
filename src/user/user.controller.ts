import { Request, Response } from "express";
import { connection } from "../lib/database";

const users = (req: Request, res: Response) => {
  const query = "SELECT * from Users";
  connection.query(query, (err, rows) => {
    if (err) {
      res.status(400).send({
        status: false,
        message:
          "Error al cargar los usuarios. Comprueba que tienes corretamente todo",
        users: [],
      });
    }

    res.status(200).send({
      status: true,
      message: "Lista de usuarios cargada correctamente",
      users: rows,
    });
  });
};

export default { users };
