import express from 'express';
import * as DurationControllers from '../controllers/durationControllers';

const DurationRouter = express.Router();

DurationRouter.route('').get(DurationControllers.getDurationByParams);
DurationRouter.route('/:id').get(DurationControllers.getDurationById);
DurationRouter.route('').post(DurationControllers.postDuration);

DurationRouter.route('/test-data').post(DurationControllers.CreateTestData);

export default DurationRouter;
