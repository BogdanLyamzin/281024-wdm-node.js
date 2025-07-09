type ManagerPages = "/dashboard" | "/profile" | "/orders" | "/customers";

type AdminPages = ManagerPages | "/categories" | "/products";

export type Role = "user" | "manager" | "admin" | "superadmin";

type User = {
    name: string,
    lastName: string,
    role: Role;
};

type Admin = User & {password: string};

const newUser: Admin = {
    name: "Bohdan",
    lastName: "Liamzin",
    role: "admin",
    password: "123456"
}



