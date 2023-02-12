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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const order_1 = require("../../models/order");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
const orderStore = new order_1.OrderStore();
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
describe('Dashboard routes tests', () => {
    describe('Tests for current orders by user route', () => __awaiter(void 0, void 0, void 0, function* () {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield orderStore.create({
                user_id: '1',
                status: true
            });
            yield orderStore.addProduct('2', '1', 2);
        }));
        it('should return status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .post('/dashboard/active-orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                userId: '1'
            });
            expect(response.status).toBe(200);
        }));
        it('should return array of orders in body', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .post('/dashboard/active-orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                userId: '1'
            });
            expect(response.body).toEqual([
                {
                    order_id: '2',
                    name: 'Pants',
                    price: 30,
                    quantity: 2,
                    category: 'men clothes'
                }
            ]);
        }));
    }));
    describe('Tests for completed orders by user route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .post('/dashboard/completed-orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                userId: '1'
            });
            expect(response.status).toBe(200);
        }));
        it('should return empty array in body', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .post('/dashboard/completed-orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                userId: '1'
            });
            expect(response.body).toEqual([]);
        }));
    }));
    describe('Most 5 popular products routes tests', () => {
        it('should return status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/dashboard/popular-products');
            expect(response.status).toBe(200);
        }));
    });
});
