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
exports.DashboardService = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardService {
    popularProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT name FROM products INNER JOIN order_products ON products.id=order_products.product_id GROUP BY products.id ORDER BY sum(order_products.quantity) DESC LIMIT 5';
                const conn = yield database_1.default.connect();
                const products = yield conn.query(sql);
                conn.release();
                return products.rows;
            }
            catch (err) {
                throw new Error(`Could not get the products Error: ${err.message}`);
            }
        });
    }
    currentUserOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT order_id,name,quantity,price,category FROM order_products INNER JOIN orders ON orders.id=order_products.order_id INNER JOIN products ON products.id=product_id WHERE user_id=($1) AND status='true'";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [userId]);
                if (!result.rows) {
                    throw new Error(`Current order for user ${userId} not found`);
                }
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find current order for user ${userId}. ${err}`);
            }
        });
    }
    completedUserOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT order_id,name,quantity,price,category FROM order_products INNER JOIN orders ON orders.id=order_products.order_id INNER JOIN products ON products.id=product_id WHERE user_id=($1) AND status='false'";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [userId]);
                if (!result.rows) {
                    throw new Error(`Completed order for user ${userId} not found`);
                }
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find completed order for user ${userId}. ${err}`);
            }
        });
    }
}
exports.DashboardService = DashboardService;
