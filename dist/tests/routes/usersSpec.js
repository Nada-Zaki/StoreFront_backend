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
describe('Tests for users end points', () => {
    describe('Tests for users index route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 401 because of not sending token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/users');
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
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
    }));
    describe('Tests for users create route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 400 because of not sending last name', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/users').send({
                first_name: 'Zaki',
                password: '123'
            });
            expect(response.status).toBe(400);
        }));
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/users').send({
                firstName: 'Zaki',
                lastName: 'Saleh',
                password: '123'
            });
            expect(response.status).toBe(200);
        }));
    }));
    describe('Tests for users authenticate route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200 because the credentials are correct', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/users/signin').send({
                firstName: 'Zaki',
                lastName: 'Saleh',
                password: '123'
            });
            expect(response.status).toBe(200);
        }));
        it('should return status code 401 because password is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/users/signin').send({
                firstName: 'Zaki',
                lastName: 'Saleh',
                password: 'anything'
            });
            expect(response.status).toBe(401);
        }));
    }));
    describe('Tests for users show route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 200 to be ok', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .get('/users/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should return status code 400 because the user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '123'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .get('/users/5')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        }));
    }));
    describe('Tests for users update route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 401 because the token in header is different from the token of user data in body', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '12345'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .put('/users/4')
                .set('Authorization', `Bearer ${token}`)
                .send({
                id: 4,
                firstName: 'Mohamed',
                lastName: 'Mahmoud',
                password: '1234'
            });
            expect(response.status).toBe(401);
        }));
    }));
    describe('Tests for users delete route', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should return status code 401 because the token in header is different from the token of user id in url', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstName: 'Nada',
                last_name: 'Zaki',
                password: '12345'
            };
            const token = jsonwebtoken_1.default.sign(user, secret);
            const response = yield request
                .delete('/users/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(401);
        }));
    }));
});
