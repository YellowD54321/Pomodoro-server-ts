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
exports.deleteDurationInTestAccount = exports.postDuration = exports.getDurationByParams = exports.getDurationById = void 0;
const client_1 = require("@prisma/client");
const config_1 = require("../config");
const prisma = new client_1.PrismaClient();
const getDurationById = (durationId) => __awaiter(void 0, void 0, void 0, function* () {
    const duration = yield prisma.duration.findUnique({
        where: {
            id: durationId,
        },
    });
    return duration;
});
exports.getDurationById = getDurationById;
const getDurationByParams = ({ user_id, begin_date, end_date, type, description, }) => __awaiter(void 0, void 0, void 0, function* () {
    const durations = yield prisma.duration.findMany({
        where: Object.assign(Object.assign(Object.assign(Object.assign({ user_id }, (begin_date && { start_time: begin_date })), (end_date && { end_time: end_date })), (type && { type })), (typeof description === 'string' && { description })),
    });
    return durations;
});
exports.getDurationByParams = getDurationByParams;
const postDuration = ({ user_id, start_time, end_time, interrupt_times, focus_seconds, pause_seconds, type, description, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newDuration = yield prisma.duration.create({
        data: {
            user: {
                connect: {
                    id: user_id,
                },
            },
            start_time,
            end_time,
            interrupt_times,
            focus_seconds,
            pause_seconds,
            type,
            description,
        },
    });
    return newDuration.id;
});
exports.postDuration = postDuration;
const deleteDurationInTestAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.duration.deleteMany({
        where: {
            user_id: config_1.testUserId,
        },
    });
});
exports.deleteDurationInTestAccount = deleteDurationInTestAccount;
