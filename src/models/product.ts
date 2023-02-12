import client from '../database';

export type Product = {
	id?: number;
	name: string;
	price: number;
	category?: string;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM products';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get products. Error: ${err}`);
		}
	}

	async show(id: string): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			if (!result.rows[0]) {
				throw new Error(`Product ${id} not found`);
			}
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find product ${id}. ${err}`);
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const sql =
				'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [p.name, p.price, p.category]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
		}
	}

	async update(p: Product): Promise<Product> {
		try {
			const sql =
				'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [p.name, p.price, p.category, p.id]);
			if (!result.rows[0]) {
				throw new Error(`Product ${p.id} not found`);
			}
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not edit product ${p.name}. ${err}`);
		}
	}

	async delete(id: string): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
			const conn = await client.connect();
			const product = await conn.query('SELECT * FROM products WHERE id=($1)', [
				id
			]);
			if (!product.rows[0]) {
				throw new Error(`Product ${id} not found`);
			}
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete product ${id}. ${err}`);
		}
	}

	async productsByCategory(category: string): Promise<Product[]> {
		try {
			const sql = 'SELECT * FROM products WHERE category=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [category]);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not find products for category ${category}. ${err}`);
		}
	}
}
