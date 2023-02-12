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
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const productsRoutes = (0, express_1.Router)();
const store = new product_1.ProductStore();
productsRoutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
productsRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
productsRoutes.post('/', verifyAuthToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const newProduct = yield store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
productsRoutes.put('/:id', verifyAuthToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = Object.assign({ id: +req.params.id }, req.body);
        const newProduct = yield store.update(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
productsRoutes.delete('/:id', verifyAuthToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield store.delete(id);
        res.status(200).json('deleted');
    }
    catch (err) {
        res.json(err);
    }
}));
productsRoutes.get('/category/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.productsByCategory(req.params.category);
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
exports.default = productsRoutes;
