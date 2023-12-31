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
exports.registerTestAccount = exports.getTestAccountUser = exports.registerUserByGoogle = exports.getUserByGoogleId = exports.getUserById = void 0;
const config_1 = require("../config");
const userQueries_1 = require("../queries/userQueries");
const db = __importStar(require("./db"));
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return db.query(userQueries_1.UserQueries.GetUserById, [userId]);
});
exports.getUserById = getUserById;
const getUserByGoogleId = (googleId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.query(userQueries_1.UserQueries.GetUserByGoogleId, [googleId]);
});
exports.getUserByGoogleId = getUserByGoogleId;
const registerUserByGoogle = (googleId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db.query(userQueries_1.UserQueries.RegisterUserByGoogleId, [googleId]);
    return result.affectedRows > 0;
});
exports.registerUserByGoogle = registerUserByGoogle;
const getTestAccountUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return db.query(userQueries_1.UserQueries.GetUserById, [config_1.testUserId]);
});
exports.getTestAccountUser = getTestAccountUser;
const registerTestAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db.query(userQueries_1.UserQueries.RegisterTestAccount, [config_1.testUserId]);
    return result.affectedRows > 0;
});
exports.registerTestAccount = registerTestAccount;
