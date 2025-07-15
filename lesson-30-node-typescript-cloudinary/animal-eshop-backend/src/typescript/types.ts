export type Role = "superadmin" | "admin" | "manager" | "user";

export type ValidationType = {
    value: RegExp;
    message: string;
}