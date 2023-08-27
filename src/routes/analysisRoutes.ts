import express from "express";
import * as AnalysisControllers from "../controllers/analysisControllers";

const AnalysisRouter = express.Router();

AnalysisRouter.route("/day").get(AnalysisControllers.GetAnalysisWithDay);
AnalysisRouter.route("/month").get(AnalysisControllers.GetAnalysisWithMonth);

export default AnalysisRouter;
