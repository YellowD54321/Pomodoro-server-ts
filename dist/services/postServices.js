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
exports.getPosts = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../constants");
const prisma = new client_1.PrismaClient();
const getPosts = ({ user_id, page = 1, }) => __awaiter(void 0, void 0, void 0, function* () {
    const durations = yield prisma.duration.findMany({
        where: Object.assign({ end_time: {
                not: null,
            } }, (user_id && {
            user_id: {
                not: user_id,
            },
        })),
        orderBy: {
            end_time: 'desc',
        },
        take: constants_1.POSTS_ONE_PAGE_COUNT,
        skip: (page - 1) * constants_1.POSTS_ONE_PAGE_COUNT,
    });
    const posts = durations.map((duration) => ({
        durationId: duration.id,
        user_id: duration.user_id,
        start_time: duration.start_time,
        end_time: duration.end_time,
        interrupt_times: duration.interrupt_times,
        focus_seconds: duration.focus_seconds,
        pause_seconds: duration.pause_seconds,
        type: duration.type,
        description: duration.description,
    }));
    return posts;
});
exports.getPosts = getPosts;
