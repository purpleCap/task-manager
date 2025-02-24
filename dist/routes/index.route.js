"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const task_route_1 = __importDefault(require("./task.route"));
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const rootRouter = express_1.default.Router();
rootRouter.use('/auth', user_route_1.default);
rootRouter.use('/tasks', is_auth_1.default, task_route_1.default);
exports.default = rootRouter;
