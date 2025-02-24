"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError {
    constructor(obj) {
        this.statusCode = obj.statusCode;
        this.error = obj.error;
        this.data = obj.data;
    }
}
exports.default = CustomError;
