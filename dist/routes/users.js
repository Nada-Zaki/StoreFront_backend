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
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const verifyAutherization_1 = __importDefault(require("../middleware/verifyAutherization"));
const usersRoutes = (0, express_1.Router)();
const store = new user_1.UserStore();
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
usersRoutes.get('/', verifyAuthToken_1.default, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
usersRoutes.get('/:id', verifyAuthToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
usersRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const newUser = yield store.create(user);
        const token = jsonwebtoken_1.default.sign(newUser, secret);
        res.json(token);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
usersRoutes.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = (yield store.authenticate(user));
        const token = jsonwebtoken_1.default.sign(result, secret);
        res.json(token);
    }
    catch (err) {
        res.status(401).json(err.message);
    }
}));
usersRoutes.put('/:id', verifyAutherization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Object.assign({ id: +req.params.id }, req.body);
        const newProduct = yield store.update(user);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
usersRoutes.delete('/:id', verifyAutherization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield store.delete(id);
        res.status(200).json('deleted');
    }
    catch (err) {
        res.json(err.message);
    }
}));
exports.default = usersRoutes;
