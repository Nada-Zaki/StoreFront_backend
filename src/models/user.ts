import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
	id?: number;
	firstName: string;
	lastName: string;
	password: string;
};

export class UserStore {
	async index(): Promise<User[]> {
		try {
			const sql = 'SELECT id, first_name FROM users';
			const conn = await client.connect();
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get users. Error: ${err}`);
		}
	}

	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT id, first_name FROM users WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			if (!result.rows[0]) {
				throw new Error(`User ${id} not found`);
			}
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find user ${id}. ${err}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
			const conn = await client.connect();
			const hash = bcrypt.hashSync(
				u.password + BCRYPT_PASSWORD,
				+(SALT_ROUNDS as string)
			);
			const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (err) {
			throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`);
		}
	}

	async update(u: User): Promise<User> {
		try {
			const sql =
				'UPDATE users SET first_name=($1), last_name=($2), password=($3) WHERE id=($4) RETURNING *';
			const conn = await client.connect();
			const hash = bcrypt.hashSync(
				u.password + BCRYPT_PASSWORD,
				+(SALT_ROUNDS as string)
			);
			const result = await conn.query(sql, [u.firstName, u.lastName, hash, u.id]);
			if (!result.rows[0]) {
				throw new Error(`User ${u.id} not found`);
			}
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not edit user ${u.id}. ${err}`);
		}
	}

	async delete(id: string): Promise<User> {
		try {
			const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
			const conn = await client.connect();
			const user = await conn.query('SELECT * FROM users WHERE id=($1)', [id]);
			if (!user.rows[0]) {
				throw new Error(`User ${id} not found`);
			}
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete user ${id}. ${err}`);
		}
	}

	async authenticate(u: User): Promise<User | null> {
		try {
			const sql = 'SELECT * FROM users WHERE first_name=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [u.firstName]);
			conn.release();
			if (result.rows.length) {
				const user = result.rows[0];
				if (bcrypt.compareSync(u.password + BCRYPT_PASSWORD, user.password)) {
					return user;
				}
			}
			return null;
		} catch (err) {
			throw new Error(`Could not authenticate user ${u.firstName}. Error: ${err}`);
		}
	}
}
