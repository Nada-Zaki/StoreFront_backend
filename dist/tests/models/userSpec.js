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
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Model', () => {
    it('index method should return a list of one user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result.length).toEqual(1);
    }));
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            firstName: 'Mohamed',
            lastName: 'Ahmed',
            password: '123'
        });
        expect(result).toBeTruthy();
    }));
    it('update method should edit a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update({
            id: 1,
            firstName: 'Nada',
            lastName: 'Zaki',
            password: '123'
        });
        expect(result).toBeDefined();
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show('2');
        expect(result).toBeTruthy();
    }));
    it('authenticate method should return null if password is not correct', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.authenticate({
            firstName: 'Nada',
            lastName: 'Zaki',
            password: 'anything'
        });
        expect(result).toBeNull();
    }));
    it('delete method should remove the user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete('2');
        expect(result).toBeDefined();
    }));
});
