import dotenv from "dotenv-safe";
import mysql from "mysql";
import {
  createQuotesTableSQL,
  createUsersTableSQL,
  createViewQuotesTableSQL,
  dropQuotesTableSQL,
  dropUsersTableSQL,
  dropViewQuotesTableSQL,
} from "./sql.js";

dotenv.config();

const connectionString = process.env.DATABASE_URL || "";
const connection = mysql.createConnection(connectionString);
connection.connect();

const dropTables = [
  dropUsersTableSQL,
  dropQuotesTableSQL,
  dropViewQuotesTableSQL,
];
const createTables = [
  createUsersTableSQL,
  createQuotesTableSQL,
  createViewQuotesTableSQL,
];

const loadAndSaveData = async () => {
  try {
    for (var i = 0; i < 3; i++) {
      await connection.query(dropTables[i]);
      await connection.query(createTables[i]);
    }
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

loadAndSaveData();
