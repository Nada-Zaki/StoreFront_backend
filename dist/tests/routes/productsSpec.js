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
describe('Tests for products end points', () => {
    describe('Tests for products index route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/products');
            expect(response.status).toBe(200);
        }));
        it('should return array of products in body', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/products');
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: 'Pants',
                    price: 30,
                    category: 'men clothes'
                }
            ]);
        }));
    }));
    describe('Tests for products create route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 401 because of not sending token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/products').send({
                name: 'Blouse',
                price: '15.99',
                category: 'women'
            });
            expect(response.status).toBe(401);
        }));
        it('should return status code 200 to be ok even if not assigning category', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .post('/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                name: 'Blouse',
                price: '15.99'
            });
            expect(response.status).toBe(200);
        }));
    }));
    describe('Tests for products show route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/products/1');
            expect(response.status).toBe(200);
        }));
        it('should return status code 400 because the product does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/products/9');
            expect(response.status).toBe(400);
        }));
    }));
    describe('Tests for products by category route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return array of products in body', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/products/category/men clothes');
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: 'Pants',
                    price: 30,
                    category: 'men clothes'
                }
            ]);
        }));
    }));
    describe('Tests for products update route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .put('/products/1')
                .set('Authorization', `Bearer ${token}`)
                .send({
                name: 'Pants',
                price: '30',
                category: 'men clothes'
            });
            expect(response.status).toBe(200);
        }));
        it('should return status code 400 as the price not assigned', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .put('/products/1')
                .set('Authorization', `Bearer ${token}`)
                .send({
                id: 1,
                name: 'Blouse',
                category: 'women clothes'
            });
            expect(response.status).toBe(400);
        }));
    }));
    describe('Tests for products delete route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 401 because of not sending token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete('/products/1');
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
                .delete('/products/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
    }));
});
