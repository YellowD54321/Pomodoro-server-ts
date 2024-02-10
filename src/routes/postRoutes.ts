import express from 'express';
import * as PostControllers from '../controllers/postControllers';

const PostRouter = express.Router();

PostRouter.route('').get(PostControllers.getPosts);

export default PostRouter;
