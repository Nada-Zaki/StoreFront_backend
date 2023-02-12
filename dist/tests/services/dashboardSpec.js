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
const dashboard_1 = require("../../services/dashboard");
const order_1 = require("../../models/order");
const service = new dashboard_1.DashboardService();
const orderStore = new order_1.OrderStore();
describe('Dashboard service tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield orderStore.create({
            user_id: '1',
            status: true
        });
        yield orderStore.addProduct('3', '3', 2);
    }));
    it('current user order method should return the active orders of a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service.currentUserOrder('1');
        expect(result).toEqual([
            {
                order_id: '3',
                name: 'Blouse',
                quantity: 2,
                price: 15.99,
                category: null
            }
        ]);
    }));
    it('completed user orders method should return the completed orders of a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service.completedUserOrder('1');
        expect(result).toEqual([]);
    }));
    it('should return most 5 popular products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service.popularProducts();
        expect(result).toBeTruthy();
    }));
});
