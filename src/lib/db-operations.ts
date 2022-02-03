import { queryCallback } from "mysql";
import { connection } from "../lib/database";
import { createConstants } from "../config/constants";

export const findElementById = (
  collection: string,
  valueSearch: string | number,
  callback: queryCallback
) => {
  const query = `SELECT * FROM ${collection} WHERE ${collection}.id=?`;
  connection.query(query, [valueSearch], callback);
};
export const findElement = (
  collection: string,
  paramsSearch: string,
  valueSearch: string | number,
  callback: queryCallback
) => {
  const query = `SELECT * FROM ${collection} WHERE ${collection}.${paramsSearch}=?`;
  return connection.query(query, [valueSearch], callback);
};

export const findAllElements = (
  collection: string,
  callback: queryCallback
) => {
  const query = `SELECT * FROM ${collection} `;
  connection.query(query, callback);
};
export const createElement = (
  collection: string,
  values: Object,
  callback: queryCallback
) => {
  const query = `INSERT INTO ${collection} ${createConstants[collection]} VALUES (null,?)`;
  connection.query(query, [Object.values(values)], callback);
};
export const deleteElementById = (
  collection: string,
  valueSearch: number,
  callback: queryCallback
) => {
  const query = `DELETE FROM ${collection} WHERE ${collection}.id=?`;
  connection.query(query, [valueSearch], callback);
};

export const updateElementById = (
  collection: string,
  valueSearch: number,
  valueChange: Object,
  callback: queryCallback
) => {
  const query = `UPDATE ${collection} SET ? WHERE id=?`;
  connection.query(query, [valueChange, valueSearch], callback);
};
export const deleteAllElement = (
  collection: string,
  paramDelete: string,
  valueDelete: number | string,
  callback: queryCallback
) => {
  const query = `DELETE FROM ${collection} WHERE ${paramDelete}=?`;
  connection.query(query, [valueDelete], callback);
};

export const deleteElementShuffle = (
  userId: number,
  quoteId: number,
  callback: queryCallback
) => {
  const query = `DELETE FROM ViewQuotes WHERE userId=? AND quoteId=?`;
  connection.query(query, [userId, quoteId], callback);
};

export const findAllElementsShuffle = (
  valueSearch: number,
  admin: boolean,
  callback: queryCallback
) => {
  let query = `SELECT * FROM Quotes WHERE idUser=?`;
  if (admin) query += " OR role='admin'";
  connection.query(query, [valueSearch], callback);
};
export const createMultipleElements = (
  collection: string,
  values: any,
  callback: queryCallback
) => {
  const query = `INSERT INTO ${collection} ${createConstants[collection]} VALUES ?`;
  connection.query(query, [values], callback);
};
