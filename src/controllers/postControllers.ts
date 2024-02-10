import { Response } from 'express';
import { IGetPostsByParamReq, ILikePostByParamReq } from '../models/postModel';
import * as PostServices from '../services/postServices';

export const getPosts = async (req: IGetPostsByParamReq, res: Response) => {
  const user = req.body.user;
  const page = req.query.page;
  const userId = user ? user.id : null;

  try {
    const posts = await PostServices.getPosts({
      user_id: userId,
      page,
    });

    return res.status(200).json({
      posts,
    });
  } catch (err) {
    console.error('[post controller][getPosts][Error] ', err);

    return res.status(500).json({
      message: 'There was an error when fetching posts',
    });
  }
};

export const likePost = async (req: ILikePostByParamReq, res: Response) => {
  const post_id = req.params.post_id;
  const user = req.body.user;
  const emoji = req.body.emoji;

  if (!user) {
    return res.status(406).json({
      success: false,
      message: 'Invalid request.',
    });
  }

  try {
    await PostServices.likePost({
      post_id,
      user_id: user.id,
      emoji,
    });

    return res.status(200).json({
      message: 'like post successfully',
    });
  } catch (err) {
    console.error('[post controller][likePost][Error] ', err);

    return res.status(500).json({
      message: 'There was an error when like post',
    });
  }
};
