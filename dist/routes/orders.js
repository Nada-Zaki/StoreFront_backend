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
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const ordersRoutes = (0, express_1.Router)();
const store = new order_1.OrderStore();
ordersRoutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
ordersRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
ordersRoutes.post('/', verifyAuthToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status = true;
        if (req.body.status === 'complete') {
            status = false;
        }
        const result = yield store.create({
            user_id: req.body.userId,
            status
        });
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
ordersRoutes.post('/:id/products', verifyAuthToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.addProduct(req.params.id, req.body.productId, +req.body.quantity);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
ordersRoutes.put('/:id', verifyAuthToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status = true;
        if (req.body.status === 'complete') {
            status = false;
        }
        const result = yield store.update({
            id: +req.params.id,
            user_id: req.body.userId,
            status
        });
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
ordersRoutes.delete('/:id', verifyAuthToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield store.delete(id);
        res.status(200).json('deleted');
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
exports.default = ordersRoutes;
