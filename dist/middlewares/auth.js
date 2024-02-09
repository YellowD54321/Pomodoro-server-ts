"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authorize = (req, res, next) => {
    const bearerToken = req.headers['x-access-token'];
    if (!bearerToken) {
        return res.status(403).send({
            success: false,
            message: 'Authentication token is required.',
        });
    }
    try {
        const token = bearerToken.split(' ')[1];
        const decode = jsonwebtoken_1.default.verify(token, config_1.auth.accessSecret);
        req.body.user = decode;
        next();
    }
    catch (err) {
        return res.status(401).send({
            success: false,
            message: 'Invalid request.',
        });
    }
};
exports.default = authorize;
