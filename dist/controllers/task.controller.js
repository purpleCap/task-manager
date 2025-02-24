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
const task_1 = __importDefault(require("../model/task"));
const user_1 = __importDefault(require("../model/user"));
const express_validator_1 = require("express-validator");
const error_1 = __importDefault(require("../model/error"));
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect');
            const cerror = new error_1.default({ statusCode: 422, error, data: errors });
            throw cerror;
            // return res.status(422).json({message: 'Validation failed, entered data is incorrect', errors: errors.array()})
        }
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            const error = new Error("No user found");
            const cerror = new error_1.default({ statusCode: 404, error, data: null });
            throw cerror;
        }
        const { title, description } = req.body;
        const postContent = {
            title: title,
            description: description,
            creator: req.userId
        };
        const newTask = new task_1.default(postContent);
        const result = yield newTask.save();
        if (user.tasks)
            user.tasks.push(result._id);
        else {
            user.tasks = [result._id];
        }
        yield user.save();
        res.status(201).json({
            status: true,
            message: "Task created successfully",
            task: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userId).populate('tasks', "-creator -__v")
            .sort({ createdAt: -1 });
        if (!user) {
            const error = new Error("No user found");
            const cerror = new error_1.default({ statusCode: 404, error, data: null });
            throw cerror;
        }
        res.status(201).json({
            status: true,
            message: "Task fetched successfully",
            task: user.tasks,
        });
    }
    catch (err) {
        next(err);
    }
});
const getTaskById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userId).populate('tasks', "-creator -__v")
            .sort({ createdAt: -1 });
        if (!user) {
            const error = new Error("No user found");
            const cerror = new error_1.default({ statusCode: 404, error, data: null });
            throw cerror;
        }
        const { id } = req.params;
        const findIndexOf = user.tasks.findIndex(t => String(t._id) === id);
        if (findIndexOf === -1) {
            const error = new Error("You are not authorized to access this task");
            const cerror = new error_1.default({ statusCode: 403, error, data: null });
            throw cerror;
        }
        const task = yield task_1.default.findById(id);
        res.status(201).json({
            status: true,
            message: "Task fetched successfully",
            task: task,
        });
    }
    catch (err) {
        next(err);
    }
});
const editTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect');
            const cerror = new error_1.default({ statusCode: 422, error, data: errors });
            throw cerror;
        }
        const user = yield user_1.default.findById(req.userId).populate('tasks', "-creator -__v");
        if (!user) {
            const error = new Error("No user found");
            const cerror = new error_1.default({ statusCode: 404, error, data: null });
            throw cerror;
        }
        const { title, description } = req.body;
        const { id } = req.params;
        const findIndexOf = user.tasks.findIndex(t => String(t._id) === id);
        if (findIndexOf === -1) {
            const error = new Error("You are not authorized to access this task");
            const cerror = new error_1.default({ statusCode: 403, error, data: null });
            throw cerror;
        }
        const task = yield task_1.default.findById(id);
        task.title = title;
        task.description = description;
        const result = yield (task === null || task === void 0 ? void 0 : task.save());
        res.status(200).json({
            status: true,
            message: "Task updated successfully",
            task: result
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userId).populate('tasks', "-creator -__v");
        if (!user) {
            const error = new Error("No user found");
            const cerror = new error_1.default({ statusCode: 404, error, data: null });
            throw cerror;
        }
        const { id } = req.params;
        const findIndexOf = user.tasks.findIndex(t => String(t._id) === id);
        if (findIndexOf === -1) {
            const error = new Error("You are not authorized to access this task");
            const cerror = new error_1.default({ statusCode: 403, error, data: null });
            throw cerror;
        }
        const task = yield task_1.default.findById(id);
        yield (task === null || task === void 0 ? void 0 : task.deleteOne());
        res.status(200).json({
            status: true,
            message: "Task deleted",
            task: task
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = { createTask, getTask, getTaskById, editTask, deleteTask };
