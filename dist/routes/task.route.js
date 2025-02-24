"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = __importDefault(require("./../controllers/task.controller"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get('/', task_controller_1.default.getTask);
router.get('/:id', task_controller_1.default.getTaskById);
router.post('/create', [
    (0, express_validator_1.body)('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title cannot be empty")
], task_controller_1.default.createTask);
router.put('/:id', [
    (0, express_validator_1.body)('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title cannot be empty")
], task_controller_1.default.editTask);
router.delete('/:id', task_controller_1.default.deleteTask);
exports.default = router;
