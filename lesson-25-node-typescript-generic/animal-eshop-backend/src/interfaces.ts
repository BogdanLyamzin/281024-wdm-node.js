import { Request } from "express";

export interface IHttpError extends Error {
    status: number;
}

type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    token?: string;
}

export interface IRequestUser extends Request {
    user: User
}