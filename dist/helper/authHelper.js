"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const createAuthToken = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: userId }, config_1.auth.accessSecret, {
        expiresIn: '1h',
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: userId }, config_1.auth.refreshSecret, {
        expiresIn: '7d',
    });
    const token = {
        access_token: accessToken,
        refresh_token: refreshToken,
    };
    return token;
};
exports.createAuthToken = createAuthToken;
