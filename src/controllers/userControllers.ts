import { Request, RequestHandler, Response } from "express";
import * as UserServices from "../services/userServices";
import {
  IGetUserByGoogleIdReq,
  IGetUserReq,
  IRegisterUserByGoogleReq,
} from "../models/userModel";
import { getGoogleId } from "../helper/userHelper";
import { createAuthToken } from "../helper/authHelper";

// @ts-ignore
export const getUserById: RequestHandler = async (
  req: IGetUserReq,
  res: Response
) => {
  try {
    const user = await UserServices.getUserById(Number(req.params.id));
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.error(
      "[user controller][getUserById][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    res.status(500).json({
      message: "There was an error when fetching user",
    });
  }
};

// @ts-ignore
export const getUserByGoogleId: RequestHandler = async (
  req: IGetUserByGoogleIdReq,
  res: Response
) => {
  try {
    const user = await UserServices.getUserByGoogleId(req.params.google_id);
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.error(
      "[user controller][getUserByGoogleId][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    res.status(500).json({
      message: "There was an error when fetching user",
    });
  }
};

export const registerUserByGoogle: RequestHandler = async (
  req: IRegisterUserByGoogleReq,
  res: Response
) => {
  const accessToken = req.body.access_token;
  if (!accessToken) {
    res.status(400).json({
      message: "access_token is required.",
    });
    return;
  }

  let googleId = "";
  try {
    googleId = await getGoogleId(accessToken);
  } catch (err) {
    console.error(
      "[user controller][registerUserByGoogle getGoogleId][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    res.status(500).json({
      message: "There was an error when registering user",
    });
    return;
  }

  if (!googleId) {
    res.status(400).json({
      message: "Invalid access_token.",
    });
    return;
  }

  try {
    const [oldUser] = await UserServices.getUserByGoogleId(googleId);
    if (oldUser) {
      res.status(406).json({
        message: "Google account is already registered.",
      });
      return;
    }

    const isSuccess = await UserServices.registerUserByGoogle(googleId);
    res.status(200).json({
      success: isSuccess,
    });
  } catch (err) {
    console.error(
      "[user controller][registerUserByGoogle][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    res.status(500).json({
      message: "There was an error when registering user",
    });
  }
};

export const loginUserByGoogle: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const accessToken = req.body.access_token;
  if (!accessToken) {
    return res.status(400).json({
      message: "access_token is required.",
    });
  }

  let googleId = "";
  try {
    googleId = await getGoogleId(accessToken);
  } catch (err) {
    console.error(
      "[user controller][loginUserByGoogle getGoogleId][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    res.status(500).json({
      message: "There was an error when signing in user",
    });
    return;
  }

  if (!googleId) {
    res.status(400).json({
      message: "Invalid access_token.",
    });
    return;
  }

  try {
    const [user] = await UserServices.getUserByGoogleId(googleId);
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
    console.error(
      "[user controller][loginUserByGoogle][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    res.status(500).json({
      message: "There was an error when signing in user",
    });
  }
};

export const loginTestAccount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const [user] = await UserServices.getTestAccountUser();
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
            message: "Register test account fail.",
          });
        }
      } catch (err) {
        console.error(
          "[user controller][loginTestAccount][Error] ",
          typeof err === "object" ? JSON.stringify(err) : err
        );
        return res.status(500).json({
          message: "Register test account fail.",
        });
      }
      const [user] = await UserServices.getTestAccountUser();
      const token = createAuthToken(user.id);
      return res.status(200).json({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      });
    }
  } catch (err) {
    console.error(
      "[user controller][loginTestAccount][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    return res.status(500).json({
      message: "Login test account fail.",
    });
  }
};
