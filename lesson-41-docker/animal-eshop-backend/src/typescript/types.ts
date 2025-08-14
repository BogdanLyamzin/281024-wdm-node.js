export type Role = "superadmin" | "admin" | "manager" | "user";

export type ValidationType = {
    value: RegExp;
    message: string;
}

export type StatusCode = 400 | 401 | 403 | 404 | 409 | 500;