import { PrismaClient } from '@prisma/client';
import { IAnalysis, IGetAnalysisByParam } from '../models/analysisModel';

const prisma = new PrismaClient();

export const GetAnalysisWithDay = async ({
  user_id,
  begin_date,
  end_date,
  type,
  description,
}: IGetAnalysisByParam): Promise<IAnalysis[]> => {
  const analysises = await prisma.$queryRaw<IAnalysis[]>`
        SELECT
          DATE_FORMAT(start_time, '%Y-%m-%d') AS label, 
          COUNT(*) AS amount, 
          SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) AS minute
        FROM Duration 
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
};

export const GetAnalysisWithMonth = async ({
  user_id,
  begin_date,
  end_date,
  type,
  description,
}: IGetAnalysisByParam): Promise<IAnalysis[]> => {
  const analysises = await prisma.$queryRaw<IAnalysis[]>`
        SELECT 
          DATE_FORMAT(start_time, '%Y-%m') AS label, 
          COUNT(*) AS amount, 
          SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) AS minute
        FROM Duration
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
};
