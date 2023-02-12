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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT id, first_name FROM users';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT id, first_name FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                if (!result.rows[0]) {
                    throw new Error(`User ${id} not found`);
                }
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
                const conn = yield database_1.default.connect();
                const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, +SALT_ROUNDS);
                const result = yield conn.query(sql, [u.firstName, u.lastName, hash]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`);
            }
        });
    }
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE users SET first_name=($1), last_name=($2), password=($3) WHERE id=($4) RETURNING *';
                const conn = yield database_1.default.connect();
                const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, +SALT_ROUNDS);
                const result = yield conn.query(sql, [u.firstName, u.lastName, hash, u.id]);
                if (!result.rows[0]) {
                    throw new Error(`User ${u.id} not found`);
                }
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not edit user ${u.id}. ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                const conn = yield database_1.default.connect();
                const user = yield conn.query('SELECT * FROM users WHERE id=($1)', [id]);
                if (!user.rows[0]) {
                    throw new Error(`User ${id} not found`);
                }
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete user ${id}. ${err}`);
            }
        });
    }
    authenticate(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE first_name=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [u.firstName]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(u.password + BCRYPT_PASSWORD, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`Could not authenticate user ${u.firstName}. Error: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
