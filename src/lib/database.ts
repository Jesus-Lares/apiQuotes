import mysql from "mysql";

const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: 3306,
  user: process.env.USERNAMEDB,
  password: process.env.PASSWORD,
  ssl: { rejectUnauthorized: true },
});
connection.connect();

export { connection };
