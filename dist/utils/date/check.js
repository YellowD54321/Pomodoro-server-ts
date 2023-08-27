"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = void 0;
const isValidDate = (date) => {
    const ms = new Date(date).getTime();
    return !isNaN(ms) && ms >= 0;
};
exports.isValidDate = isValidDate;
