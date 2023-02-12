"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
const verifyAutherization = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const userId = +req.params.id;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded.id !== userId) {
            throw new Error('User id does not match!');
        }
        next();
    }
    catch (err) {
        res.status(401).json(err.message);
    }
};
exports.default = verifyAutherization;
