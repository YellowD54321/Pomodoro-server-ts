import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { auth } from "../config";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers["x-access-token"] as string;
  if (!bearerToken) {
    return res.status(403).send({
      success: false,
      message: "Authentication token is required.",
    });
  }

  try {
    const token = bearerToken.split(" ")[1];
    const decode = jwt.verify(token, auth.accessSecret);
    req.body.user = decode;
    next();
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: "Invalid request.",
    });
  }
};

export default authorize;
