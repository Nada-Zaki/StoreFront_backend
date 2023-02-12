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
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Product Model', () => {
    it('index method should return a list of one product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'Pants',
                price: 30,
                category: 'men clothes'
            }
        ]);
    }));
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            name: 'Dress',
            price: 30,
            category: 'Dresses'
        });
        expect(result).toEqual({
            id: 2,
            name: 'Dress',
            price: 30,
            category: 'Dresses'
        });
    }));
    it('update method should edit a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update({
            id: 2,
            name: 'Dress',
            price: 30,
            category: 'Dresses'
        });
        expect(result).toEqual({
            id: 2,
            name: 'Dress',
            price: 30,
            category: 'Dresses'
        });
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show('2');
        expect(result).toEqual({
            id: 2,
            name: 'Dress',
            price: 30,
            category: 'Dresses'
        });
    }));
    it('products by category method should return the correct products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.productsByCategory('men clothes');
        expect(result).toEqual([
            {
                id: 1,
                name: 'Pants',
                price: 30,
                category: 'men clothes'
            }
        ]);
    }));
    it('delete method should remove the product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete('2');
        expect(result).toEqual({
            id: 2,
            name: 'Dress',
            price: 30,
            category: 'Dresses'
        });
    }));
});
