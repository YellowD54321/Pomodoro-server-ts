"use strict";
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return user;
});
exports.getUserById = getUserById;
const getUserByGoogleId = (googleId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            google_id: googleId,
        },
    });
    return user;
});
exports.getUserByGoogleId = getUserByGoogleId;
const registerUserByGoogle = (googleId) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield prisma.user.create({
        data: {
            google_id: googleId,
        },
    });
    return newUser;
});
exports.registerUserByGoogle = registerUserByGoogle;
const getTestAccountUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: config_1.testUserId,
        },
    });
    return user;
});
exports.getTestAccountUser = getTestAccountUser;
const registerTestAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield prisma.user.create({
        data: {
            id: config_1.testUserId,
        },
    });
    return newUser;
});
exports.registerTestAccount = registerTestAccount;
