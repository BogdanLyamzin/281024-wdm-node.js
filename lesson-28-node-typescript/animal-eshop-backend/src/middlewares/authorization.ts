import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import User, { UserDocument } from "../db/User";

import HttpExeption from "../utils/HttpExeption.js";

import { TokenPayload } from "../services/auth.service";

import { AuthenticatedRequest } from "../interfaces";

const { JWT_SECRET } = process.env;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  // const authorization = req.get("authorization");
  if (!authorization) throw HttpExeption(401, "Authorization header missing");

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") throw HttpExeption(401, "Bearer missing");

  try {
    const { id } = jwt.verify(token, JWT_SECRET as string) as TokenPayload;
    const user: UserDocument | null = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return next(HttpExeption(401, "User not found"));
    }
    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    if(error instanceof Error) {
      throw HttpExeption(401, error.message);
    }
    throw HttpExeption(401, error);
  }
};

export const isSuperadmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as AuthenticatedRequest).user.role !== "superadmin") throw HttpExeption(403, "Not allow");
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as AuthenticatedRequest).user.role !== "superadmin" && (req as AuthenticatedRequest).user.role !== "admin")
    throw HttpExeption(403, "Not allow");
  next();
};

export const isManager = (req: Request, res: Response, next: NextFunction) => {
  if ((req as AuthenticatedRequest).user.role === "user") throw HttpExeption(403, "Not allow");
  next();
};
