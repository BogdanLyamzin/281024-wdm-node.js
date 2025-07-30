import { Request } from "express";

import { UserDocument } from "../db/User";

export interface IHttpError extends Error {
    status: number;
}

export interface AuthenticatedRequest extends Request {
    user: UserDocument
}