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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleId = void 0;
const axios_1 = __importDefault(require("axios"));
const getGoogleId = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const res = yield axios_1.default.get(url, config);
        return res.data.id;
    }
    catch (err) {
        console.error("[user helper][getGoogleId][Error] ", typeof err === "object" ? JSON.stringify(err) : err);
        throw err;
    }
});
exports.getGoogleId = getGoogleId;
