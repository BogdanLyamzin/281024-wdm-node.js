import { Request, Response, NextFunction } from "express";

import HttpExeption from "../utils/HttpExeption";

const parseNumber = (value: string | undefined) => {
    if(value === undefined) return;
    const parsedValue = Number(value);
    if(Number.isNaN(parsedValue)) {
        throw HttpExeption(400, `${value} not a number`);
    }
    return parseNumber;
}

const parsePaginationParams = (req: Request, res: Response, next: NextFunction)=> {
    //@ts-expect-error
    req.query.page = parseNumber(req.query.page);
    //@ts-expect-error
    req.query.perPage = parseNumber(req.query.perPage);
    next();
}

export default parsePaginationParams;