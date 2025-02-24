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
const cors_1 = __importDefault(require("cors"));
const secrets_1 = require("./secrets");
const mongoose_1 = __importDefault(require("mongoose"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const server = (0, express_1.default)();
const corsOptions = {
    origin: 'http://10.0.2.2:8081',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};
server.use((0, cors_1.default)(corsOptions));
server.use(express_1.default.json());
// server.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next()
// });
server.use('/api', index_route_1.default);
server.use((error, req, res, next) => {
    var _a;
    const statusCode = error.statusCode || 500;
    const message = ((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message) || 'Internal Server Error';
    const data = error.data || null;
    res.status(statusCode).json({ status: false, statusCode: statusCode, message: message, data: data });
});
mongoose_1.default.connect(secrets_1.DB_CONNECTION_STRING)
    .then((_) => __awaiter(void 0, void 0, void 0, function* () {
    //   const hasUser  = await User.findOne();
    //   if(!hasUser) {
    //     const user = new User({name: "pratik", email: "pratik@example.com", password: "Pass@123"})
    //     await user.save()
    //   }
    console.log("connected to DB");
    server.listen(secrets_1.PORT, () => {
        console.log(`server is running on port ${secrets_1.PORT}`);
    });
}))
    .catch(err => {
    console.log(err);
});
