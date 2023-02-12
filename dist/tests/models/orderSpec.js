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
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const store = new order_1.OrderStore();
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
describe('Order Model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userStore.create({
            firstName: 'Nada',
            lastName: 'Zaki',
            password: '1234'
        });
        yield productStore.create({
            name: 'Pants',
            price: 30,
            category: 'men clothes'
        });
    }));
    it('index method should return an empty list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
    it('create method should add an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            user_id: '1',
            status: true
        });
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: true
        });
    }));
    it('update method should edit an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update({
            id: 1,
            user_id: '1',
            status: true
        });
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: true
        });
    }));
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show('1');
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: true
        });
    }));
    it('create method should add a product in order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.addProduct('1', '1', 4);
        expect(result).toBeTruthy();
    }));
    it('delete method should remove the order by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete('1');
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: true
        });
    }));
});
