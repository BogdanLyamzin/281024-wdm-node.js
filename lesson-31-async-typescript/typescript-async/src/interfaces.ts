import { Role } from "./types";

interface IUser {
    name: string,
    lastName: string,
}

interface IUser {
    role: Role
}

const user: IUser = {
    name: "Bohdan",
    lastName: "Liamzin",
    role: "user"
}

interface IAdmin extends IUser {
    password: string;
}

const admin: IAdmin = {
    name: "Bohdan",
    lastName: "Liamzin",
    role: "admin",
    password: "123456",
}

class User {
    name: string;
    lastName: string;
    private role = "user";

    constructor(name: string, lastName: string) {
        this.name = name;
        this.lastName = lastName;
    }
}

interface IMiddleware {
    routes: string[],
    callback(req: object, res: object, next: ()=> {}): void
}

class MiddlewareAccess implements IMiddleware {
    routes = ["/users", "/books"]
    
    callback(req: object, res: object, next: ()=> {}) {

    }
}

class MiddlewareValidate implements IMiddleware {
    routes = ["/users/add", "/books/add"]

    validate(body: object): boolean {
        return true;
    }
    
    callback(req: object, res: object, next: ()=> {}) {

    }
}

class MiddlewareTranslate implements IMiddleware {
    routes: string

    callback(req: object, res: object, next: ()=> {}) {

    }
}