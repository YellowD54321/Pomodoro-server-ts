import mysql from "mysql2/promise";
import * as config from "../config";

export const query = async <T = unknown>(
  sql: string,
  params: string[] | Object
): Promise<T> => {
  const connection = await mysql.createConnection(config.db);
  const [rows, fields] = await connection.execute(sql, params);
  return <T>rows;
};
