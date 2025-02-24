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
const user_1 = __importDefault(require("../model/user"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../model/error"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            const cerror = new error_1.default({ statusCode: 422, error, data: errors });
            throw cerror;
        }
        const { email, name, password } = req.body;
        // const hasUser = await User.findOne({email: email});
        // console.log(hasUser)
        // if(hasUser) {
        //     const error = new Error('Account already exists with this email');
        //     const cerror = new CustomError({statusCode: 409, error, data: null});
        //     throw cerror;
        // }
        const encrypted_pass = yield bcryptjs_1.default.hash(password, 12);
        const user = new user_1.default({ email, password: encrypted_pass, name });
        const result = yield user.save();
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: "Registered successfully",
            userId: result._id
        });
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const fetchedUser = yield user_1.default.findOne({ email: email });
        if (!fetchedUser) {
            const error = new Error("No user found with this email");
            const cerror = new error_1.default({ statusCode: 404, error, data: null });
            throw cerror;
        }
        const isAuthenticated = yield bcryptjs_1.default.compare(password, fetchedUser.password);
        if (isAuthenticated) {
            const token = jsonwebtoken_1.default.sign({
                email: email,
                password: password,
                userId: fetchedUser._id
            }, "areallylongstringaskey", { expiresIn: '1h' });
            res.status(200).json({
                status: true,
                statusCode: 200,
                user: fetchedUser,
                token: token
            });
        }
        else {
            const error = new Error("Wrong credentials!");
            const cerror = new error_1.default({ statusCode: 401, error, data: null });
            throw cerror;
        }
    }
    catch (err) {
        next(err);
    }
});
exports.default = { createUser, login };
