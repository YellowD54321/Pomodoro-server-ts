import { Request, RequestHandler, Response } from 'express';
import * as UserServices from '../services/userServices';
import {
  IGetUserByGoogleIdReq,
  IGetUserReq,
  IRegisterUserByGoogleReq,
} from '../models/userModel';
import { getGoogleId } from '../helper/userHelper';
import { createAuthToken } from '../helper/authHelper';

// @ts-expect-error: ignore this for ts
export const getUserById: RequestHandler = async (
  req: IGetUserReq,
  res: Response,
) => {
  try {
    const user = await UserServices.getUserById(req.params.id);

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.error('[user controller][getUserById][Error] ', err);

    res.status(500).json({
      message: 'There was an error when fetching user',
    });
  }
};

// @ts-expect-error: ignore this for ts
export const getUserByGoogleId: RequestHandler = async (
  req: IGetUserByGoogleIdReq,
  res: Response,
) => {
  try {
    const user = await UserServices.getUserByGoogleId(req.params.google_id);

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.error('[user controller][getUserByGoogleId][Error] ', err);

    res.status(500).json({
      message: 'There was an error when fetching user',
    });
  }
};

export const registerUserByGoogle: RequestHandler = async (
  req: IRegisterUserByGoogleReq,
  res: Response,
) => {
  const accessToken = req.body.access_token;

  if (!accessToken) {
    return res.status(400).json({
      message: 'access_token is required.',
    });
  }

  let googleId = '';

  try {
    googleId = await getGoogleId(accessToken);
  } catch (err) {
    console.error(
      '[user controller][registerUserByGoogle getGoogleId][Error] ',
      err,
    );

    return res.status(500).json({
      message: 'There was an error when registering user',
    });
  }

  if (!googleId) {
    return res.status(400).json({
      message: 'Invalid access_token.',
    });
  }

  try {
    const oldUser = await UserServices.getUserByGoogleId(googleId);

    if (oldUser) {
      return res.status(406).json({
        message: 'Google account is already registered.',
      });
    }

    const isSuccess = await UserServices.registerUserByGoogle(googleId);

    res.status(200).json({
      success: isSuccess,
    });
  } catch (err) {
    console.error('[user controller][registerUserByGoogle][Error] ', err);

    res.status(500).json({
      message: 'There was an error when registering user',
    });
  }
};

export const loginUserByGoogle: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const accessToken = req.body.access_token;

  if (!accessToken) {
    return res.status(400).json({
      message: 'access_token is required.',
    });
  }

  let googleId = '';

  try {
    googleId = await getGoogleId(accessToken);
  } catch (err) {
    console.error(
      '[user controller][loginUserByGoogle getGoogleId][Error] ',
      err,
    );

    return res.status(500).json({
      message: 'There was an error when signing in user',
    });
  }

  if (!googleId) {
    return res.status(400).json({
      message: 'Invalid access_token.',
    });
  }

  try {
    const user = await UserServices.getUserByGoogleId(googleId);

    if (!user) {
      return res.status(406).json({
        message: "user didn't register with this google account",
      });
    }

    const token = createAuthToken(user.id);

    return res.status(200).json({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    });
  } catch (err) {
    console.error('[user controller][loginUserByGoogle][Error] ', err);

    res.status(500).json({
      message: 'There was an error when signing in user',
    });
  }
};

export const loginTestAccount: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await UserServices.getTestAccountUser();
    if (user) {
      const token = createAuthToken(user.id);
      return res.status(200).json({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      });
    } else {
      try {
        const isSuccess = await UserServices.registerTestAccount();

        if (!isSuccess) {
          return res.status(500).json({
            message: 'Register test account fail.',
          });
        }
      } catch (err) {
        console.error('[user controller][loginTestAccount][Error] ', err);

        return res.status(500).json({
          message: 'Register test account fail.',
        });
      }
      const user = await UserServices.getTestAccountUser();

      if (!user) {
        return res.status(500).json({
          message: 'test account not found',
        });
      }

      const token = createAuthToken(user.id);

      return res.status(200).json({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      });
    }
  } catch (err) {
    console.error('[user controller][loginTestAccount][Error] ', err);

    return res.status(500).json({
      message: 'Login test account fail.',
    });
  }
};
