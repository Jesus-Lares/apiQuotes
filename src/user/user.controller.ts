import { Request, Response } from "express";
import { MysqlError } from "mysql";
import bcrypt from "bcrypt";

import {
  createElement,
  findElements,
  findOneElement,
} from "../lib/db-operations";
import { Collections, errorCreateUser, RoleUser } from "../config/constants";

const users = (req: Request, res: Response) => {
  findElements(Collections.users, (err: MysqlError | null, result) => {
    if (err) {
      return res.status(400).send({
        status: false,
        message:
          "Error al cargar los usuarios. Comprueba que tienes corretamente todo",
        users: [],
      });
    }
    return res.status(200).send({
      status: true,
      message: "Lista de usuarios cargada correctamente",
      users: result,
    });
  });
};

const signUp = async (req: Request, res: Response) => {
  const send = {
    status: false,
    message: errorCreateUser.default,
    user: null,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: errorCreateUser.DATA_EMPTY });

  const { name, email, password } = req.body;

  findOneElement(Collections.users, "email", email, (emailErr, results) => {
    if (emailErr) return res.status(400).send(send);

    if (results.length != 0)
      return res
        .status(400)
        .send({ ...send, message: errorCreateUser.EMAIL_EXIST });

    const user = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      registerDate: new Date().toISOString(),
      role: RoleUser.client,
      state: 1,
    };

    createElement(Collections.users, user, (err, userResults) => {
      if (err) {
        console.log(err);
        return res.status(400).send(send);
      }
      return res.status(200).send({
        status: true,
        message: "Usuario creado correctamente",
        user: { id: userResults.insertId, ...user },
      });
    });
  });
};
export default { users, signUp };
