"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisQueries = void 0;
exports.AnalysisQueries = {
    GetAnalysisWithDay: `
        SELECT DATE_FORMAT(start_time, '%Y-%m-%d') AS label, 
        COUNT(*) AS amount, 
        SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) AS minute
        FROM durations WHERE
        user_id = ?
        AND start_time >= IF(? IS NOT NULL, ?, '1000-01-01')
        AND start_time <= IF(? IS NOT NULL, ?, '3000-12-31')
        AND (? IS NULL OR type = ?)
        AND (? IS NULL OR description LIKE CONCAT('%', ?, '%'))
        GROUP BY label
        ORDER BY label ASC;
    `,
    GetAnalysisWithMonth: `
        SELECT DATE_FORMAT(start_time, '%Y-%m') AS label, 
        COUNT(*) AS amount, 
        SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) AS minute
        FROM durations WHERE
        user_id = ?
        AND start_time >= IF(? IS NOT NULL, ?, '1000-01-01')
        AND start_time <= IF(? IS NOT NULL, ?, '3000-12-31')
        AND (? IS NULL OR type = ?)
        AND (? IS NULL OR description LIKE CONCAT('%', ?, '%'))
        GROUP BY label
        ORDER BY label ASC;
    `,
};
