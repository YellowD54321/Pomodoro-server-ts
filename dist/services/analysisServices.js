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
exports.GetAnalysisWithMonth = exports.GetAnalysisWithDay = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const GetAnalysisWithDay = ({ user_id, begin_date, end_date, type, description, }) => __awaiter(void 0, void 0, void 0, function* () {
    const analysises = yield prisma.$queryRaw `
        SELECT
          DATE_FORMAT(start_time, '%Y-%m-%d') AS label, 
          COUNT(*) AS amount, 
          SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) AS minute
        FROM duration 
        WHERE
          user_id = ${user_id}
          AND start_time >= IF(${begin_date} IS NOT NULL, ${begin_date}, '1000-01-01')
          AND end_time <= IF(${end_date} IS NOT NULL, ${end_date}, '3000-12-31')
          AND (${type} IS NULL OR type = ${type})
          AND (${description} IS NULL OR description LIKE CONCAT('%', ${description}, '%'))
        GROUP BY label
        ORDER BY label ASC;
  `;
    return analysises.map((analysis) => ({
        label: analysis.label,
        amount: Number(analysis.amount),
        minute: analysis.minute,
    }));
});
exports.GetAnalysisWithDay = GetAnalysisWithDay;
const GetAnalysisWithMonth = ({ user_id, begin_date, end_date, type, description, }) => __awaiter(void 0, void 0, void 0, function* () {
    const analysises = yield prisma.$queryRaw `
        SELECT 
          DATE_FORMAT(start_time, '%Y-%m') AS label, 
          COUNT(*) AS amount, 
          SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) AS minute
        FROM duration
        WHERE
          user_id = ${user_id}
          AND start_time >= IF(${begin_date} IS NOT NULL, ${begin_date}, '1000-01-01')
          AND end_time <= IF(${end_date} IS NOT NULL, ${end_date}, '3000-12-31')
          AND (${type} IS NULL OR type = ${type})
          AND (${description} IS NULL OR description LIKE CONCAT('%', ${description}, '%'))
        GROUP BY label
        ORDER BY label ASC;
  `;
    return analysises.map((analysis) => ({
        label: analysis.label,
        amount: Number(analysis.amount),
        minute: analysis.minute,
    }));
});
exports.GetAnalysisWithMonth = GetAnalysisWithMonth;
