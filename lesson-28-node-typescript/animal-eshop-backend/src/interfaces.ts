import { Request, Express } from "express";

import { UserDocument } from "./db/User";

export interface IHttpError extends Error {
    status: number;
}

export interface AuthenticatedRequest extends Request {
    user: UserDocument;
}

export interface MulterRequest extends Request {
    file: Express.Multer.File
}