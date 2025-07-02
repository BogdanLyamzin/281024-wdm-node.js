"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createBook_1 = __importDefault(require("./functions/createBook"));
const roles = ["user", "admin", "manager"];
const checkRole = (role) => {
    if (roles.includes(role))
        return true;
    throw new Error("Not allow role");
};
// console.log(checkRole("user"));
// console.log(checkRole("newUser"));
const book = (0, createBook_1.default)("Worm", new Date(2012, 3, 1));
