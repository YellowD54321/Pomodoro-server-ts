import dotenv from "dotenv";

dotenv.config();

export const db = {
  host: "localhost",
  user: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: "pomodoro",
  port: 3306,
};

export const auth = {
  accessSecret: "75s8n#nX5moO",
  refreshSecret: "9Ue!td8U8uw0",
};

export const testUserId = 54321;
