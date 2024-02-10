import express from 'express';
import * as PostControllers from '../controllers/postControllers';

const PostsRouter = express.Router();

PostsRouter.route('').get(PostControllers.getPosts);

const PostRouter = express.Router();

PostRouter.route('/like/:post_id').post(PostControllers.likePost);

export { PostsRouter, PostRouter };
