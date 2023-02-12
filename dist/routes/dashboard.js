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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_1 = require("../services/dashboard");
const dashboardRoutes = (0, express_1.Router)();
const service = new dashboard_1.DashboardService();
dashboardRoutes.get('/popular-products', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield service.popularProducts();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
dashboardRoutes.post('/active-orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentOrders = yield service.currentUserOrder(req.body.userId);
        res.json(currentOrders);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
dashboardRoutes.post('/completed-orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completedOrders = yield service.completedUserOrder(req.body.userId);
        res.json(completedOrders);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
exports.default = dashboardRoutes;
