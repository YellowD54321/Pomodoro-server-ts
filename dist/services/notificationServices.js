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
exports.createNotification = exports.getNotifications = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNotifications = ({ user_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield prisma.notification.findMany({
        where: {
            receiver: {
                id: user_id,
            },
        },
        select: {
            id: true,
            receiver: true,
            receiver_id: true,
            sender: true,
            sender_id: true,
            post: true,
            post_id: true,
            content: true,
            isRead: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return notifications;
});
exports.getNotifications = getNotifications;
const createNotification = ({ receiver_id, sender_id, post_id, content, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.notification.create({
        data: Object.assign(Object.assign({ receiver: {
                connect: {
                    id: receiver_id,
                },
            }, sender: {
                connect: {
                    id: sender_id,
                },
            } }, (post_id && {
            post: {
                connect: {
                    id: post_id,
                },
            },
        })), { content, isRead: false }),
    });
});
exports.createNotification = createNotification;
