"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("./products"));
const users_1 = __importDefault(require("./users"));
const orders_1 = __importDefault(require("./orders"));
const dashboard_1 = __importDefault(require("./dashboard"));
const routes = (0, express_1.Router)();
routes.get('/', (_req, res) => {
    res.json('server working!');
});
routes.use('/products', products_1.default);
routes.use('/users', users_1.default);
routes.use('/orders', orders_1.default);
routes.use('/dashboard', dashboard_1.default);
exports.default = routes;
