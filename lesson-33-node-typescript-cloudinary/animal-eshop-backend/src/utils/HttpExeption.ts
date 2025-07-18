import { HttpError } from "../typescript/classes";
import { IHttpError } from "../typescript/interfaces";
import { StatusCode } from "../typescript/types";

interface IMessageList {
    [key: number]: string;
}

const messageList: IMessageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Server error"
}

// interface IUser {
//     [key: string]: string;
//     // name: string;
//     // lastName: string;
// }

// const user: IUser = {
//     name: "Bohdan",
//     lastName: "Liamzin"
// };

// // user.age = "42";

// const key = "age";

// const userName = user[key];

const HttpExeption = (status: StatusCode, message = messageList[status])=> {
    const error = new HttpError(message);
    error.status = status;
    return error;
}

export default HttpExeption;