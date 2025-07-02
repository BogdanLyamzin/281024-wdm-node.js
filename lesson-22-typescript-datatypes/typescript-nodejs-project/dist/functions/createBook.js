"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createBook = (name, year, description) => {
    return {
        bookName: name,
        year,
        description,
    };
};
exports.default = createBook;
