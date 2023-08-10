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
exports.postDuration = exports.getDurationById = void 0;
const DurationServices = __importStar(require("../services/durationServices"));
const check_1 = require("../utils/check");
const constants_1 = require("../constants");
const getDurationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duration = yield DurationServices.getDurationById(Number(req.params.id));
        res.status(200).json({
            duration,
        });
    }
    catch (err) {
        console.error("[duration controller][getDurationById][Error] ", typeof err === "object" ? JSON.stringify(err) : err);
        res.status(500).json({
            message: "There was an error when fetching duration",
        });
    }
});
exports.getDurationById = getDurationById;
const postDuration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const interrupt_times = req.body.interrupt_times || 0;
    const durationType = req.body.type;
    const description = req.body.description || "";
    if (!start_time || !(0, check_1.isValidDate)(start_time)) {
        res.status(400).json({
            message: "Invalid start_time. start_time must be Date type",
        });
    }
    if (!constants_1.durationTypes.includes(durationType)) {
        const types = constants_1.durationTypes.join(" | ");
        res.status(400).json({
            message: `Invalid type. start_time must be ${types}`,
        });
    }
    const focus_seconds = end_time
        ? Math.floor((new Date(end_time).getTime() - new Date(start_time).getTime()) / 1000)
        : 0;
    try {
        let insertid = 0;
        try {
            insertid = yield DurationServices.postDuration({
                user_id: user.id,
                start_time,
                end_time,
                focus_seconds,
                interrupt_times,
                type: durationType,
                description,
            });
        }
        catch (err) {
            console.error("[duration controller][DurationServices.postDuration][Error] ", typeof err === "object" ? JSON.stringify(err) : err);
            res.status(500).json({
                message: "Post duration failed.",
            });
            return;
        }
        const duration = yield DurationServices.getDurationById(insertid);
        res.status(200).json({
            duration,
        });
        return;
    }
    catch (err) {
        console.error("[duration controller][DurationServices.postDuration][Error] ", typeof err === "object" ? JSON.stringify(err) : err);
        res.status(500).json({
            message: "Post duration successful, but unable to get the posted data.",
        });
        return;
    }
});
exports.postDuration = postDuration;
