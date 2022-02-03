import { Request, Response } from "express";

import {
  createElement,
  deleteElementById,
  findElement,
  findElementById,
  updateElementById,
} from "../lib/db-operations";
import { Collections, messageQuotes, RoleUser } from "../config/constants";

const quotes = (req: Request, res: Response) => {
  const idUser = req.userId || -1;

  findElement(Collections.quotes, "idUser", idUser, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send({
        status: false,
        message: messageQuotes.ERROR_DEFAULT,
        quotes: [],
      });
    }
    return res.status(200).send({
      status: true,
      message: messageQuotes.GET_ALL,
      users: result,
    });
  });
};
const createQuote = (req: Request, res: Response) => {
  const send = {
    status: false,
    message: messageQuotes.ERROR_DEFAULT,
  };
  if (!req.body)
    res.status(400).send({ ...send, message: messageQuotes.DATA_EMPTY });
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
      message: messageQuotes.CREATE_SUCCESS,
      user: { id: results.insertId, ...obj },
    });
  });
};
const getQuote = (req: Request, res: Response) => {
  const { id } = req.params;
  const send = {
    status: false,
    message: messageQuotes.ERROR_DEFAULT,
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
        .send({ ...send, message: messageQuotes.QUOTE_NOT_EXIST });

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
    message: messageQuotes.ERROR_DEFAULT,
  };
  findElementById(Collections.quotes, parseInt(id), (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: messageQuotes.QUOTE_NOT_EXIST });

    deleteElementById(Collections.quotes, parseInt(id), (errDelete) => {
      if (errDelete) {
        console.log(errDelete);
        return res.status(400).send(send);
      }
      return res.status(200).send({
        status: true,
        message: messageQuotes.DELETE_SUCCESS,
      });
    });
  });
};
const updateQuote = (req: Request, res: Response) => {
  const { id } = req.params;
  const send = {
    status: false,
    message: messageQuotes.ERROR_DEFAULT,
  };
  findElementById(Collections.quotes, parseInt(id), (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(send);
    }
    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: messageQuotes.QUOTE_NOT_EXIST });

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
          message: messageQuotes.UPDATE_SUCCESS,
        });
      }
    );
  });
};

export default { quotes, createQuote, getQuote, deleteQuote, updateQuote };
