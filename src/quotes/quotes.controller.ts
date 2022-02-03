import { Request, Response } from "express";
import { MysqlError } from "mysql";

import {
  createElement,
  deleteElementById,
  findElement,
  findElementById,
  updateElementById,
} from "../lib/db-operations";
import { Collections, errorsQuote, RoleUser } from "../config/constants";

const quotes = (req: Request, res: Response) => {
  const idUser = req.userId || -1;

  findElement(
    Collections.quotes,
    "idUser",
    idUser,
    (err: MysqlError | null, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          status: false,
          message:
            "Error al cargar las citas. Comprueba que tienes todo corretamente.",
          quotes: [],
        });
      }
      return res.status(200).send({
        status: true,
        message: "Lista de citas cargada correctamente",
        users: result,
      });
    }
  );
};
const createQuote = (req: Request, res: Response) => {
  const send = {
    status: false,
    message: errorsQuote.default,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: errorsQuote.DATA_EMPTY });
  const { quote, writer } = req.body;

  const obj = {
    quote,
    writer,
    role: RoleUser.client,
    idUser: req.userId,
    registerDate: new Date().toISOString(),
  };
  createElement(Collections.quotes, obj, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    return res.status(200).send({
      status: true,
      message: "Cita creada correctamente",
      user: { id: results.insertId, ...obj },
    });
  });
};
const getQuote = (req: Request, res: Response) => {
  const { id } = req.params;
  const send = {
    status: false,
    message: errorsQuote.default,
    quote: null,
  };
  findElementById(Collections.quotes, parseInt(id), (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: errorsQuote.QUOTE_NOT_EXIST });

    return res.status(200).send({
      status: true,
      quote: results[0],
    });
  });
};
const deleteQuote = (req: Request, res: Response) => {
  const { id } = req.params;
  const send = {
    status: false,
    message: errorsQuote.default,
  };
  findElementById(Collections.quotes, parseInt(id), (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: errorsQuote.QUOTE_NOT_EXIST });

    deleteElementById(Collections.quotes, parseInt(id), (errDelete) => {
      if (errDelete) {
        console.log(errDelete);
        return res.status(400).send(send);
      }
      return res.status(200).send({
        status: true,
        message: "Cita eliminada.",
      });
    });
  });
};
const updateQuote = (req: Request, res: Response) => {
  const { id } = req.params;
  const send = {
    status: false,
    message: errorsQuote.default,
  };
  findElementById(Collections.quotes, parseInt(id), (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: errorsQuote.QUOTE_NOT_EXIST });

    updateElementById(
      Collections.quotes,
      parseInt(id),
      req.body,
      (errUpdate) => {
        if (errUpdate) {
          console.log(errUpdate);
          return res.status(400).send(send);
        }
        return res.status(200).send({
          status: true,
          message: "Cita actualizada.",
        });
      }
    );
  });
};

export default { quotes, createQuote, getQuote, deleteQuote, updateQuote };
