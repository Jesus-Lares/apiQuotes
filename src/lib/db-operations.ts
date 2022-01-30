import { queryCallback } from "mysql";
import { connection } from "../lib/database";
import { createConstants } from "../config/constants";

export const findOneElementById = (
  collection: string,
  valueSearch: string | number,
  callback: queryCallback
) => {
  const query = `SELECT * FROM ${collection} WHERE ${collection}.id=?`;
  connection.query(query, [valueSearch], callback);
};
export const findOneElement = (
  collection: string,
  paramsSearch: string,
  valueSearch: string | number,
  callback: queryCallback
) => {
  const query = `SELECT * FROM ${collection} WHERE ${collection}.${paramsSearch}=?`;
  return connection.query(query, [valueSearch], callback);
};

export const findElements = (collection: string, callback: queryCallback) => {
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
