import { Request, Response } from "express";
import { MysqlError } from "mysql";
import bcrypt from "bcrypt";

import {
  createElement,
  findElements,
  findOneElement,
  findOneElementById,
} from "../lib/db-operations";
import { Collections, errorCreateUser, RoleUser } from "../config/constants";
import JWT from "../lib/jwt";

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

const signUp = (req: Request, res: Response) => {
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
const signIn = (req: Request, res: Response) => {
  const send = {
    status: false,
    message: errorCreateUser.default,
    user: null,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: errorCreateUser.DATA_EMPTY });

  const { email, password } = req.body;

  findOneElement(Collections.users, "email", email, (emailErr, results) => {
    if (emailErr) return res.status(400).send(send);

    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: errorCreateUser.EMAIL_NOT_EXIST });
    const user = results[0];
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      return res
        .status(400)
        .send({ ...send, message: errorCreateUser.WRONG_PASSWORD });
    }
    delete user.password;
    delete user.registerDate;
    delete user.email;
    delete user.role;
    delete user.state;

    return res.status(200).send({
      status: true,
      message: "Usuario cargado correctamente",
      token: new JWT().sign({ user }),
    });
  });
};

const getMe = (req: Request, res: Response) => {
  const send = {
    status: false,
    message: errorCreateUser.default,
    user: null,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: errorCreateUser.DATA_EMPTY });

  const { token } = req.body;
  let info = new JWT().verify(token);
  if (info === errorCreateUser.TOKEN_VERICATION_FAILED) {
    return res.status(400).send({ ...send, message: info });
  }

  findOneElementById("Users", Object.values(info)[0].id, (err, results) => {
    if (err) res.status(500).send(send);
    else
      res.status(200).send({
        status: true,
        message: "Usuario cargado correctamente.",
        user: results[0],
      });
  });
};

export default { users, signUp, signIn, getMe };
