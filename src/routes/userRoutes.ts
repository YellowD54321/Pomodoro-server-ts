import express from 'express';
import * as UserControllers from '../controllers/userControllers';

const UserRouter = express.Router();

UserRouter.route('/:id').get(UserControllers.getUserById);
UserRouter.route('/google/:google_id').get(UserControllers.getUserByGoogleId);
UserRouter.route('/register/google').post(UserControllers.registerUserByGoogle);
UserRouter.route('/login/google').post(UserControllers.loginUserByGoogle);

UserRouter.route('/login/tester').get(UserControllers.loginTestAccount);

export default UserRouter;
