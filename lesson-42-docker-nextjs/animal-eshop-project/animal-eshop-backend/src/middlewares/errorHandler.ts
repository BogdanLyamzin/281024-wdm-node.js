import { Request, Response, NextFunction } from "express";

import { IHttpError } from "../typescript/interfaces";

const errorHandler = (error: IHttpError, _: Request, res: Response, __: NextFunction)=> {
    const {status = 500, message} = error;
    res.status(status).json({
        message,
    })
}

export default errorHandler;