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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                if (!result.rows[0]) {
                    throw new Error(`Order ${id} not found`);
                }
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [o.status, o.user_id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not add new order. Error: ${err}`);
            }
        });
    }
    addProduct(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [quantity, order_id, product_id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
            }
        });
    }
    update(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE orders SET status=($1) WHERE id=($2) RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [o.status, o.id]);
                if (!result.rows[0]) {
                    throw new Error(`Order ${o.id} not found`);
                }
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not edit order ${o.id}. ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                const conn = yield database_1.default.connect();
                const order = yield conn.query('SELECT * FROM orders WHERE id=($1)', [id]);
                if (!order.rows[0]) {
                    throw new Error(`Order ${id} not found`);
                }
                yield conn.query('DELETE FROM order_products WHERE order_id=($1)', [id]);
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
