"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginTestAccount = exports.loginUserByGoogle = exports.registerUserByGoogle = exports.getUserByGoogleId = exports.getUserById = void 0;
const UserServices = __importStar(require("../services/userServices"));
const userHelper_1 = require("../helper/userHelper");
const authHelper_1 = require("../helper/authHelper");
// @ts-expect-error: ignore this for ts
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserServices.getUserById(req.params.id);
        res.status(200).json({
            user,
        });
    }
    catch (err) {
        console.error('[user controller][getUserById][Error] ', err);
        res.status(500).json({
            message: 'There was an error when fetching user',
        });
    }
});
exports.getUserById = getUserById;
// @ts-expect-error: ignore this for ts
const getUserByGoogleId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserServices.getUserByGoogleId(req.params.google_id);
        res.status(200).json({
            user,
        });
    }
    catch (err) {
        console.error('[user controller][getUserByGoogleId][Error] ', err);
        res.status(500).json({
            message: 'There was an error when fetching user',
        });
    }
});
exports.getUserByGoogleId = getUserByGoogleId;
const registerUserByGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.access_token;
    if (!accessToken) {
        return res.status(400).json({
            message: 'access_token is required.',
        });
    }
    let googleId = '';
    try {
        googleId = yield (0, userHelper_1.getGoogleId)(accessToken);
    }
    catch (err) {
        console.error('[user controller][registerUserByGoogle getGoogleId][Error] ', err);
        return res.status(500).json({
            message: 'There was an error when registering user',
        });
    }
    if (!googleId) {
        return res.status(400).json({
            message: 'Invalid access_token.',
        });
    }
    try {
        const oldUser = yield UserServices.getUserByGoogleId(googleId);
        if (oldUser) {
            return res.status(406).json({
                message: 'Google account is already registered.',
            });
        }
        const isSuccess = yield UserServices.registerUserByGoogle(googleId);
        res.status(200).json({
            success: isSuccess,
        });
    }
    catch (err) {
        console.error('[user controller][registerUserByGoogle][Error] ', err);
        res.status(500).json({
            message: 'There was an error when registering user',
        });
    }
});
exports.registerUserByGoogle = registerUserByGoogle;
const loginUserByGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body.access_token;
    if (!accessToken) {
        return res.status(400).json({
            message: 'access_token is required.',
        });
    }
    let googleId = '';
    try {
        googleId = yield (0, userHelper_1.getGoogleId)(accessToken);
    }
    catch (err) {
        console.error('[user controller][loginUserByGoogle getGoogleId][Error] ', err);
        return res.status(500).json({
            message: 'There was an error when signing in user',
        });
    }
    if (!googleId) {
        return res.status(400).json({
            message: 'Invalid access_token.',
        });
    }
    try {
        const user = yield UserServices.getUserByGoogleId(googleId);
        if (!user) {
            return res.status(406).json({
                message: "user didn't register with this google account",
            });
        }
        const token = (0, authHelper_1.createAuthToken)(user.id);
        return res.status(200).json({
            access_token: token.access_token,
            refresh_token: token.refresh_token,
        });
    }
    catch (err) {
        console.error('[user controller][loginUserByGoogle][Error] ', err);
        res.status(500).json({
            message: 'There was an error when signing in user',
        });
    }
});
exports.loginUserByGoogle = loginUserByGoogle;
const loginTestAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserServices.getTestAccountUser();
        if (user) {
            const token = (0, authHelper_1.createAuthToken)(user.id);
            return res.status(200).json({
                access_token: token.access_token,
                refresh_token: token.refresh_token,
            });
        }
        else {
            try {
                const isSuccess = yield UserServices.registerTestAccount();
                if (!isSuccess) {
                    return res.status(500).json({
                        message: 'Register test account fail.',
                    });
                }
            }
            catch (err) {
                console.error('[user controller][loginTestAccount][Error] ', err);
                return res.status(500).json({
                    message: 'Register test account fail.',
                });
            }
            const user = yield UserServices.getTestAccountUser();
            if (!user) {
                return res.status(500).json({
                    message: 'test account not found',
                });
            }
            const token = (0, authHelper_1.createAuthToken)(user.id);
            return res.status(200).json({
                access_token: token.access_token,
                refresh_token: token.refresh_token,
            });
        }
    }
    catch (err) {
        console.error('[user controller][loginTestAccount][Error] ', err);
        return res.status(500).json({
            message: 'Login test account fail.',
        });
    }
});
exports.loginTestAccount = loginTestAccount;
