import { IAnalysis, IGetAnalysisByParam } from "../models/analysisModel";
import { AnalysisQueries } from "../queries/analysisQueries";
import * as db from "./db";

export const GetAnalysisWithDay = async ({
  user_id,
  begin_date,
  end_date,
  type,
  description,
}: IGetAnalysisByParam): Promise<IAnalysis[]> => {
  const analysises = await db.query<IAnalysis[]>(
    AnalysisQueries.GetAnalysisWithDay,
    [
      user_id,
      begin_date,
      begin_date,
      end_date,
      end_date,
      type,
      type,
      description,
      description,
    ]
  );
  return analysises;
};

export const GetAnalysisWithMonth = async ({
  user_id,
  begin_date,
  end_date,
  type,
  description,
}: IGetAnalysisByParam): Promise<IAnalysis[]> => {
  const analysises = await db.query<IAnalysis[]>(
    AnalysisQueries.GetAnalysisWithMonth,
    [
      user_id,
      begin_date,
      begin_date,
      end_date,
      end_date,
      type,
      type,
      description,
      description,
    ]
  );
  return analysises;
};
