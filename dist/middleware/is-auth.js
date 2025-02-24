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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../model/error"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = "";
        if (!req.get('Authorization')) {
            const error = new Error("You are not authorized");
            const cerror = new error_1.default({ statusCode: 403, error, data: null });
            throw cerror;
        }
        token = req.get('Authorization').split(' ')[1];
        const data = jsonwebtoken_1.default.verify(token, 'areallylongstringaskey');
        if (!data) {
            const error = new Error("Not authenticated");
            const cerror = new error_1.default({ statusCode: 401, error, data: null });
            throw cerror;
        }
        req.userId = data.userId;
        next();
    }
    catch (err) {
        if (!err.statusCode) {
            const error = new Error("Try login again");
            err = new error_1.default({ statusCode: 403, error, data: null });
        }
        next(err);
    }
});
