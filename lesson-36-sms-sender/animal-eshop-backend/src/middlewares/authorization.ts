import { Request, Response, NextFunction } from 'express';

import jwt from "jsonwebtoken";

import User from "../db/User";

import HttpExeption from "../utils/HttpExeption";

import { IJWTTokenPayload } from '../services/auth.service';
import { UserDocument } from '../db/User';
import { AuthenticatedRequest } from '../typescript/interfaces';

const { JWT_SECRET } = process.env;

type AuthrorizationHeaderArr = [bearer: string, token: string];

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // const { authorization } = req.headers;
  const authorization: string | undefined = req.get("authorization");
  if (!authorization) throw HttpExeption(401, "Authorization header missing");

  const [bearer, token] = authorization.split(" ") as AuthrorizationHeaderArr;

  if (bearer !== "Bearer") throw HttpExeption(401, "Bearer missing");

  try {
    if(typeof JWT_SECRET !== "string") {
      return next(HttpExeption(500, "JWT_SECRET not found"));
    }
    const { id } = jwt.verify(token, JWT_SECRET) as IJWTTokenPayload;
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
  }
};

export const isSuperadmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as AuthenticatedRequest).user.role !== "superadmin") throw HttpExeption(403, "Not allow");
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as AuthenticatedRequest).user.role !== "superadmin" && (req as AuthenticatedRequest).user.role !== "admin")
    throw HttpExeption(403, "Not allow");
  next();
};

export const isManager = (req: Request, res: Response, next: NextFunction)=> {
    if((req as AuthenticatedRequest).user.role === "user") throw HttpExeption(403, "Not allow");
    next();
}
