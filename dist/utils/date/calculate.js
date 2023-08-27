"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtractMinite = exports.addMinite = exports.calculateMinue = exports.subtractDay = exports.addDay = exports.calculateDay = exports.calculateDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const check_1 = require("./check");
const METHOD = {
    ADD: "add",
    SUB: "subtract",
};
const UNIT = {
    SECOND: "second",
    MINUTE: "minute",
    HOUR: "hour",
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    YEAR: "year",
};
const checkIsValidDate = (date) => {
    if (!(0, check_1.isValidDate)(date)) {
        throw new Error("date must be Date type or string which can be transformed to valid date.");
    }
};
const calculateDate = (date, number, method, unit) => {
    let time;
    switch (method) {
        case METHOD.ADD:
            time = (0, dayjs_1.default)(date).add(number, unit);
            break;
        case METHOD.SUB:
            time = (0, dayjs_1.default)(date).subtract(number, unit);
            break;
        default:
            break;
    }
    if (!time || !(0, check_1.isValidDate)(time.toString())) {
        throw new Error("calculateDate return invalid date.");
    }
    return new Date(time.toString());
};
exports.calculateDate = calculateDate;
const calculateDay = (date, number, method) => {
    return (0, exports.calculateDate)(date, number, method, "day");
};
exports.calculateDay = calculateDay;
const addDay = (date, number) => {
    checkIsValidDate(date);
    return (0, exports.calculateDay)(new Date(date), number, METHOD.ADD);
};
exports.addDay = addDay;
const subtractDay = (date, number) => {
    checkIsValidDate(date);
    return (0, exports.calculateDay)(new Date(date), number, METHOD.SUB);
};
exports.subtractDay = subtractDay;
const calculateMinue = (date, number, method) => {
    return (0, exports.calculateDate)(date, number, method, "minute");
};
exports.calculateMinue = calculateMinue;
const addMinite = (date, number) => {
    checkIsValidDate(date);
    return (0, exports.calculateMinue)(new Date(date), number, METHOD.ADD);
};
exports.addMinite = addMinite;
const subtractMinite = (date, number) => {
    checkIsValidDate(date);
    return (0, exports.calculateMinue)(new Date(date), number, METHOD.SUB);
};
exports.subtractMinite = subtractMinite;
