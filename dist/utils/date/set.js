"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndDate = exports.getBeginDate = void 0;
const check_1 = require("../check");
const getBeginDate = (date) => {
    if (!(0, check_1.isValidDate)(date)) {
        throw new Error("date must be Date type or string which can be transformed to valid date.");
    }
    const begin = new Date(date);
    begin.setHours(0, 0, 0, 0);
    return begin;
};
exports.getBeginDate = getBeginDate;
const getEndDate = (date) => {
    if (!(0, check_1.isValidDate)(date)) {
        throw new Error("date must be Date type or string which can be transformed to valid date.");
    }
    const begin = new Date(date);
    begin.setHours(23, 59, 59, 999);
    return begin;
};
exports.getEndDate = getEndDate;
