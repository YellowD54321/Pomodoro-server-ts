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
exports.likePost = exports.getPosts = void 0;
const PostServices = __importStar(require("../services/postServices"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const page = req.query.page;
    const userId = user ? user.id : null;
    try {
        const posts = yield PostServices.getPosts({
            user_id: userId,
            page,
        });
        return res.status(200).json({
            posts,
        });
    }
    catch (err) {
        console.error('[post controller][getPosts][Error] ', err);
        return res.status(500).json({
            message: 'There was an error when fetching posts',
        });
    }
});
exports.getPosts = getPosts;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.params.post_id;
    const user = req.body.user;
    const emoji = req.body.emoji;
    if (!user) {
        return res.status(406).json({
            success: false,
            message: 'Invalid request.',
        });
    }
    try {
        yield PostServices.likePost({
            post_id,
            user_id: user.id,
            emoji,
        });
        return res.status(200).json({
            message: 'like post successfully',
        });
    }
    catch (err) {
        console.error('[post controller][likePost][Error] ', err);
        return res.status(500).json({
            message: 'There was an error when like post',
        });
    }
});
exports.likePost = likePost;
