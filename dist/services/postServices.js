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
exports.likePost = exports.getPostById = exports.getPosts = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../constants");
const prisma = new client_1.PrismaClient();
const getPosts = ({ user_id, page = 1, }) => __awaiter(void 0, void 0, void 0, function* () {
    const durations = yield prisma.duration.findMany({
        where: Object.assign({ end_time: {
                not: null,
            }, focus_seconds: {
                gte: constants_1.VALID_POST_WORK_SECONDS,
            } }, (user_id && {
            user_id: {
                not: user_id,
            },
        })),
        orderBy: {
            end_time: 'desc',
        },
        select: {
            id: true,
            user_id: true,
            start_time: true,
            end_time: true,
            interrupt_times: true,
            focus_seconds: true,
            pause_seconds: true,
            type: true,
            description: true,
            PostInteraction: {
                where: {
                    emoji: {
                        not: null,
                    },
                },
            },
        },
        take: constants_1.POSTS_ONE_PAGE_COUNT,
        skip: (page - 1) * constants_1.POSTS_ONE_PAGE_COUNT,
    });
    const posts = durations.map((duration) => ({
        id: duration.id,
        durationId: duration.id,
        user_id: duration.user_id,
        start_time: duration.start_time,
        end_time: duration.end_time,
        interrupt_times: duration.interrupt_times,
        focus_seconds: duration.focus_seconds,
        pause_seconds: duration.pause_seconds,
        type: duration.type,
        description: duration.description,
        interactions: duration.PostInteraction.map((interaction) => ({
            user_id: interaction.user_id,
            post_id: interaction.post_id,
            emoji: interaction.emoji,
        })),
    }));
    return posts;
});
exports.getPosts = getPosts;
const getPostById = ({ post_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    const duration = yield prisma.duration.findUnique({
        where: {
            id: post_id,
            end_time: {
                not: null,
            },
        },
        select: {
            id: true,
            user: true,
            user_id: true,
            start_time: true,
            end_time: true,
            interrupt_times: true,
            focus_seconds: true,
            pause_seconds: true,
            type: true,
            description: true,
            PostInteraction: true,
            Notification: true,
        },
    });
    if (!duration)
        return null;
    const post = Object.assign(Object.assign({}, duration), { durationId: duration.id, interactions: duration.PostInteraction });
    return post;
});
exports.getPostById = getPostById;
const likePost = ({ post_id, user_id, emoji, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.postInteraction.upsert({
        where: {
            post_id_user_id: {
                user_id,
                post_id,
            },
        },
        create: {
            user: {
                connect: {
                    id: user_id,
                },
            },
            post: {
                connect: {
                    id: post_id,
                },
            },
            emoji,
        },
        update: {
            emoji,
        },
    });
});
exports.likePost = likePost;
