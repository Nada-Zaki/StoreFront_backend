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
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
describe('Tests for orders end points', () => {
    describe('Tests for orders index route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/orders');
            expect(response.status).toBe(200);
        }));
    }));
    describe('Tests for orders create route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 401 because of not sending token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/orders').send({
                userId: '1',
                status: 'active'
            });
            expect(response.status).toBe(401);
        }));
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                userId: '1',
                status: 'active'
            });
            expect(response.status).toBe(200);
        }));
    }));
    describe('Tests for add products in orders route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 401 because of not sending token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/orders/2/products').send({
                orderId: '2',
                productId: '1',
                quantity: 2
            });
            expect(response.status).toBe(401);
        }));
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .post('/orders/2/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                orderId: '2',
                productId: '1',
                quantity: 2
            });
            expect(response.status).toBe(200);
        }));
    }));
    describe('Tests for orders show route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/orders/2');
            expect(response.status).toBe(200);
        }));
        it('should return status code 400 because the order does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/orders/9');
            expect(response.status).toBe(400);
        }));
    }));
    describe('Tests for orders update route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .put('/orders/2')
                .set('Authorization', `Bearer ${token}`)
                .send({
                userID: '1',
                status: 'complete'
            });
            expect(response.status).toBe(200);
        }));
    }));
    describe('Tests for orders delete route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .delete('/orders/2')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
    }));
});
