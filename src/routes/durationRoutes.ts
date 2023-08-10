import express from "express";
import * as DurationControllers from "../controllers/durationControllers";

const DurationRouter = express.Router();

DurationRouter.route("/:id").get(DurationControllers.getDurationById);
DurationRouter.route("").post(DurationControllers.postDuration);

export default DurationRouter;
