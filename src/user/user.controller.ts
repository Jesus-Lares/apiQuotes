import { Request, Response } from "express";
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
import JWT from "../lib/jwt";
import { Collections, messageUser, RoleUser } from "../config/constants";
import { IUser, IUserToken } from "../interfaces/table.interface";

const users = (req: Request, res: Response) => {
  findAllElements(Collections.users, (err, result) => {
    if (err) {
      return res.status(400).send({
        status: false,
        message: messageUser.ALL_USERS,
        users: [],
      });
    }
    return res.status(200).send({
      status: true,
      message: messageUser.GET_ALL,
      users: result,
    });
  });
};
const signUp = (req: Request, res: Response) => {
  const send = {
    status: false,
    message: messageUser.ERROR_DEFAULT,
    user: null,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: messageUser.DATA_EMPTY });

  const { name, email, password } = req.body;

  findElement(Collections.users, "email", email, (emailErr, results) => {
    if (emailErr) return res.status(400).send(send);

    if (results.length != 0)
      return res
        .status(400)
        .send({ ...send, message: messageUser.EMAIL_EXIST });

    const user: IUser = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      registerDate: new Date().toISOString(),
      role: RoleUser.client,
    };

    createElement(Collections.users, user, (err, userResults) => {
      if (err) {
        console.log(err);
        return res.status(400).send(send);
      }
      const userToken: IUserToken = {
        id: userResults.insertId,
        name: user.name,
        role: bcrypt.hashSync(user.role, 10),
      };

      return res.status(200).send({
        status: true,
        message: messageUser.CREATE_SUCCESS,
        token: new JWT().sign({ user: userToken }),
      });
    });
  });
};
const signIn = (req: Request, res: Response) => {
  const send = {
    status: false,
    message: messageUser.ERROR_DEFAULT,
    user: null,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: messageUser.DATA_EMPTY });

  const { email, password } = req.body;

  findElement(Collections.users, "email", email, (emailErr, results) => {
    if (emailErr) return res.status(400).send(send);

    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: messageUser.EMAIL_NOT_EXIST });
    const user: IUser = results[0];
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      return res
        .status(400)
        .send({ ...send, message: messageUser.WRONG_PASSWORD });
    }

    const userToken: IUserToken = {
      id: user.id,
      name: user.name,
      role: bcrypt.hashSync(user.role, 10),
    };
    return res.status(200).send({
      status: true,
      message: messageUser.GET,
      token: new JWT().sign({ user: userToken }),
    });
  });
};
const getMe = (req: Request, res: Response) => {
  const send = {
    status: false,
    message: messageUser.ERROR_DEFAULT,
    user: null,
  };

  const userId = req.userId || -1;

  findElementById(Collections.users, userId, (err, results) => {
    if (err) return res.status(400).send(send);
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: messageUser.EMAIL_NOT_EXIST });

    return res.status(200).send({
      status: true,
      message: messageUser.GET,
      user: results[0],
    });
  });
};
const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const send = {
    status: false,
    message: messageUser.ERROR_DEFAULT,
  };
  findElementById(Collections.users, parseInt(id), (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: messageUser.EMAIL_NOT_EXIST });

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
          if (errQuote) return res.status(400).send(send);

          return res.status(200).send({
            status: true,
            message: messageUser.DELETE_SUCCESS,
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
    message: messageUser.ERROR_DEFAULT,
  };
  console.log("first");
  findElementById(Collections.users, userId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: messageUser.EMAIL_NOT_EXIST });

    updateElementById(Collections.users, userId, req.body, (errUpdate) => {
      if (errUpdate) {
        console.log(errUpdate);
        return res.status(400).send(send);
      }
      return res.status(200).send({
        status: true,
        message: messageUser.UPDATE_SUCCESS,
      });
    });
  });
};
export default { users, signUp, signIn, getMe, deleteUser, updateUser };
