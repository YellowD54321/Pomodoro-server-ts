"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUserId = exports.auth = exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.db = {
    host: "localhost",
    user: process.env.MYSQL_USER_NAME,
    password: process.env.MYSQL_PASSWORD,
    database: "pomodoro",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
};
exports.auth = {
    accessSecret: "75s8n#nX5moO",
    refreshSecret: "9Ue!td8U8uw0",
};
exports.testUserId = 54321;
