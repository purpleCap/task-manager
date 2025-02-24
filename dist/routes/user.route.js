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
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./../controllers/user.controller"));
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../model/user"));
const router = express_1.default.Router();
// router.get('/', userController.getUsers);
router.post('/signup', [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const fetchedUser = yield user_1.default.findOne({ email: value });
        if (fetchedUser) {
            return Promise.reject("Account already exists with this email");
        }
    }))
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .trim().isLength({ min: 5 }),
    (0, express_validator_1.body)('name')
        .trim()
        .not()
        .isEmpty()
], user_controller_1.default.createUser);
router.post('/login', user_controller_1.default.login);
exports.default = router;
