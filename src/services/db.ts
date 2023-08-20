import mysql from "mysql2/promise";
import * as config from "../config";

export const connection = mysql.createPool(config.db);

export const query = async <T = unknown>(
  sql: string,
  params: string[] | object
): Promise<T> => {
  const [rows, fields] = await connection.query(sql, params);
  return <T>rows;
};
