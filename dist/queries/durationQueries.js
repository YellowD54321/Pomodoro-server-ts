"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurationQueries = void 0;
exports.DurationQueries = {
    GetDurationById: `
        SELECT * FROM durations WHERE id = ?
    `,
    PostDuration: `
        INSERT INTO durations (user_id, start_time, end_time, interrupt_times, focus_seconds, pause_seconds, type, description)
        VALUE (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    DeleteDuration: `
        DELETE * FROM durations WHERE id = ?
    `,
};
