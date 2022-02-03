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

const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: 3306,
  user: process.env.USERNAMEDB,
  password: process.env.PASSWORD,
  ssl: { rejectUnauthorized: true },
});
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
