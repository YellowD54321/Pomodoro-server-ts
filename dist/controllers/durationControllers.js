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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestData = exports.postDuration = exports.getDurationById = exports.getDurationByParams = void 0;
const DurationServices = __importStar(require("../services/durationServices"));
const check_1 = require("../utils/date/check");
const dayjs_1 = __importDefault(require("dayjs"));
const calculate_1 = require("../utils/date/calculate");
const set_1 = require("../utils/date/set");
const config_1 = require("../config");
const client_1 = require("@prisma/client");
const getDurationByParams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const begin_date = req.query.begin_date;
    const end_date = req.query.end_date;
    const durationType = req.query.type;
    const description = req.query.description;
    try {
        const durations = yield DurationServices.getDurationByParams({
            user_id: user.id,
            begin_date,
            end_date,
            type: durationType,
            description,
        });
        return res.status(200).json({
            durations,
        });
    }
    catch (err) {
        console.error('[duration controller][getDurationByParams][Error] ', err);
        return res.status(500).json({
            message: 'There was an error when fetching duration',
        });
    }
});
exports.getDurationByParams = getDurationByParams;
const getDurationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duration = yield DurationServices.getDurationById(req.params.id);
        return res.status(200).json({
            duration,
        });
    }
    catch (err) {
        console.error('[duration controller][getDurationById][Error] ', err);
        return res.status(500).json({
            message: 'There was an error when fetching duration',
        });
    }
});
exports.getDurationById = getDurationById;
const postDuration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const interrupt_times = req.body.interrupt_times || 0;
    const pause_seconds = req.body.pause_seconds || 0;
    const durationType = req.body.type;
    const description = req.body.description || '';
    if (!start_time || !(0, check_1.isValidDate)(start_time)) {
        return res.status(400).json({
            message: 'Invalid start_time. start_time must be Date type',
        });
    }
    if (!Object.keys(client_1.DURATION_TYPE).includes(durationType)) {
        const types = Object.keys(client_1.DURATION_TYPE).join(' | ');
        return res.status(400).json({
            message: `Invalid type. type must be ${types}`,
        });
    }
    const focus_seconds = end_time
        ? Math.floor((new Date(end_time).getTime() - new Date(start_time).getTime()) / 1000) - pause_seconds
        : 0;
    try {
        let insertId;
        try {
            insertId = yield DurationServices.postDuration({
                user_id: user.id,
                start_time: (0, dayjs_1.default)(start_time).toDate(),
                end_time: (0, dayjs_1.default)(end_time).toDate(),
                interrupt_times,
                focus_seconds,
                pause_seconds,
                type: durationType,
                description,
            });
        }
        catch (err) {
            console.error('[duration controller][DurationServices.postDuration][Error] ', err);
            return res.status(500).json({
                message: 'Post duration failed.',
            });
        }
        const duration = yield DurationServices.getDurationById(insertId);
        return res.status(200).json({
            duration,
        });
    }
    catch (err) {
        console.error('[duration controller][DurationServices.getDurationById][Error] ', err);
        return res.status(500).json({
            message: 'Post duration successful, but unable to get the posted data.',
        });
    }
});
exports.postDuration = postDuration;
const CreateTestData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    if (user.id !== config_1.testUserId) {
        return res.status(401).json({
            message: 'Invalid user.',
        });
    }
    // Delete old test data first.
    try {
        yield DurationServices.deleteDurationInTestAccount();
    }
    catch (err) {
        console.error('[duration controller][DurationServices.deleteDurationInTestAccount][Error] ', err);
        return res.status(500).json({
            message: 'Delete duration failed.',
        });
    }
    const DAYS = 100;
    const MIN_NUMBER_IN_ONE_DAY = 4;
    const MAX_NUMBER_IN_ONE_DAY = 8;
    const WORK_MINUTES = 50;
    const REST_MINUTES = 10;
    const ONE_DURATION = WORK_MINUTES + REST_MINUTES;
    const DESCRIPTIONS = ['work', 'study', 'side project', 'game'];
    const FIRST_DAY = (0, calculate_1.subtractDay)(new Date(), DAYS);
    for (let i = 0; i < DAYS; i++) {
        const TODAY_NUMBER = Math.floor(Math.random() * (MAX_NUMBER_IN_ONE_DAY - MIN_NUMBER_IN_ONE_DAY) +
            MIN_NUMBER_IN_ONE_DAY);
        const currentDay = (0, calculate_1.addDay)(FIRST_DAY, i);
        const FIRST_START_TIME = (0, set_1.getBeginDate)(currentDay);
        for (let j = 0; j < TODAY_NUMBER; j++) {
            const workStartTime = (0, calculate_1.addMinite)(FIRST_START_TIME, ONE_DURATION * j);
            const workEndTime = (0, calculate_1.addMinite)(workStartTime, WORK_MINUTES);
            const restStartTime = workEndTime;
            const restEndTime = (0, calculate_1.addMinite)(restStartTime, REST_MINUTES);
            const interrupt_times = 0;
            const focus_seconds = WORK_MINUTES * 60;
            const pause_seconds = 0;
            const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
            try {
                yield DurationServices.postDuration({
                    user_id: user.id,
                    start_time: (0, dayjs_1.default)(workStartTime).toDate(),
                    end_time: (0, dayjs_1.default)(workEndTime).toDate(),
                    interrupt_times,
                    focus_seconds,
                    pause_seconds,
                    type: 'WORK',
                    description,
                });
                yield DurationServices.postDuration({
                    user_id: user.id,
                    start_time: (0, dayjs_1.default)(restStartTime).toDate(),
                    end_time: (0, dayjs_1.default)(restEndTime).toDate(),
                    interrupt_times,
                    focus_seconds: 0,
                    pause_seconds,
                    type: 'REST',
                    description,
                });
            }
            catch (err) {
                console.error('[duration controller][CreateTestData DurationServices.postDuration][Error] ', err);
                return res.status(500).json({
                    message: 'Post duration failed.',
                });
            }
        }
    }
    return res.status(200).json({
        isSuccess: true,
    });
});
exports.CreateTestData = CreateTestData;
