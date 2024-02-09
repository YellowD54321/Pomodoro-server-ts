import { Response } from 'express';
import { IGetAnalysisByParamReq } from '../models/analysisModel';
import * as AnalysisServices from '../services/analysisServices';

export const GetAnalysisWithDay = async (
  req: IGetAnalysisByParamReq,
  res: Response,
) => {
  const user = req.body.user;
  const begin_date = req.query.begin_date;
  const end_date = req.query.end_date;
  const durationType = req.query.type;
  const description = req.query.description;

  try {
    const analysises = await AnalysisServices.GetAnalysisWithDay({
      user_id: user.id,
      begin_date,
      end_date,
      type: durationType,
      description,
    });

    return res.status(200).json({
      analysises,
    });
  } catch (err) {
    console.error('[analysis controller][GetAnalysisWithDay][Error] ', err);

    return res.status(500).json({
      message: 'There was an error when fetching analysis data',
    });
  }
};

export const GetAnalysisWithMonth = async (
  req: IGetAnalysisByParamReq,
  res: Response,
) => {
  const user = req.body.user;
  const begin_date = req.query.begin_date;
  const end_date = req.query.end_date;
  const durationType = req.query.type;
  const description = req.query.description;

  try {
    const analysises = await AnalysisServices.GetAnalysisWithMonth({
      user_id: user.id,
      begin_date,
      end_date,
      type: durationType,
      description,
    });

    return res.status(200).json({
      analysises,
    });
  } catch (err) {
    console.error('[analysis controller][GetAnalysisWithMonth][Error] ', err);

    return res.status(500).json({
      message: 'There was an error when fetching analysis data',
    });
  }
};
