import dotenv from 'dotenv';

dotenv.config();

export const db = {
  host: 'localhost',
  user: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: 'pomodoro',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

export const auth = {
  accessSecret: '75s8n#nX5moO',
  refreshSecret: '9Ue!td8U8uw0',
};

export const testUserId = 54321;
