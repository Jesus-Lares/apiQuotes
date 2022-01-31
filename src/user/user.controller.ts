import { Request, Response } from "express";
import { MysqlError } from "mysql";
import bcrypt from "bcrypt";

import {
  createElement,
  deleteAllElement,
  deleteElementById,
  findAllElements,
  findElement,
  findElementById,
  updateElementById,
} from "../lib/db-operations";
import {
  Collections,
  createConstants,
  errorsUser,
  RoleUser,
} from "../config/constants";
import JWT from "../lib/jwt";

const users = (req: Request, res: Response) => {
  findAllElements(Collections.users, (err: MysqlError | null, result) => {
    if (err) {
      return res.status(400).send({
        status: false,
        message: createConstants.ALL_USERS,
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
    message: errorsUser.default,
    user: null,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: errorsUser.DATA_EMPTY });

  const { name, email, password } = req.body;

  findElement(Collections.users, "email", email, (emailErr, results) => {
    if (emailErr) return res.status(400).send(send);

    if (results.length != 0)
      return res.status(400).send({ ...send, message: errorsUser.EMAIL_EXIST });

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
    message: errorsUser.default,
    user: null,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: errorsUser.DATA_EMPTY });

  const { email, password } = req.body;

  findElement(Collections.users, "email", email, (emailErr, results) => {
    if (emailErr) return res.status(400).send(send);

    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: errorsUser.EMAIL_NOT_EXIST });
    const user = results[0];
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      return res
        .status(400)
        .send({ ...send, message: errorsUser.WRONG_PASSWORD });
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
    message: errorsUser.default,
    user: null,
  };

  const userId = req.userId || -1;

  findElementById("Users", userId, (err, results) => {
    if (err) return res.status(400).send(send);
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: errorsUser.EMAIL_NOT_EXIST });

    return res.status(200).send({
      status: true,
      message: "Usuario cargado correctamente.",
      user: results[0],
    });
  });
};
const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const send = {
    status: false,
    message: errorsUser.default,
  };
  findElementById(Collections.users, parseInt(id), (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: errorsUser.EMAIL_NOT_EXIST });

    deleteElementById(Collections.users, parseInt(id), (errDelete) => {
      if (errDelete) {
        console.log(errDelete);
        return res.status(400).send(send);
      }
      deleteAllElement(
        Collections.quotes,
        "idUser",
        parseInt(id),
        (errQuote) => {
          if (errDelete) {
            console.log(errDelete);
            return res.status(400).send(send);
          }
          return res.status(200).send({
            status: true,
            message: "Usuario eliminado.",
          });
        }
      );
    });
  });
};
const updateUser = (req: Request, res: Response) => {
  const userId = req.userId || -1;
  const send = {
    status: false,
    message: errorsUser.default,
  };
  findElementById(Collections.users, userId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: errorsUser.EMAIL_NOT_EXIST });

    updateElementById(Collections.users, userId, req.body, (errUpdate) => {
      if (errUpdate) {
        console.log(errUpdate);
        return res.status(400).send(send);
      }
      return res.status(200).send({
        status: true,
        message: "Usuario actualizado.",
      });
    });
  });
};
export default { users, signUp, signIn, getMe, deleteUser, updateUser };
