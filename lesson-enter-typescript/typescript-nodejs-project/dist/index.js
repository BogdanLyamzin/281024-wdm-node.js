"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const calcWeightIndex = (weight, height) => {
    const result = weight / height ** 2;
    return Number(result.toFixed(2));
};
console.log(calcWeightIndex(90, 1.9));
class User {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
