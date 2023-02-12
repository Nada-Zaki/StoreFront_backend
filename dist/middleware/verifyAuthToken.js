"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
const verifyAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (err) {
        res.status(401).json('Access denied, invalid token.');
        return;
    }
};
exports.default = verifyAuthToken;
