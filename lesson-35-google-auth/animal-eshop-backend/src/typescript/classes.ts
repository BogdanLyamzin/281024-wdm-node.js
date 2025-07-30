export class HttpError extends Error {
    status?: number;

    constructor(message: string | undefined){
        super(message);
    }
}