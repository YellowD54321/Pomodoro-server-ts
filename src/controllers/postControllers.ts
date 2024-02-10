import { Response } from 'express';
import { IGetPostsByParamReq } from '../models/postModel';
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
