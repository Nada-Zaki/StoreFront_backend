import client from '../database';

export type Order = {
	id?: number;
	status: boolean;
	user_id: string;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM orders';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not get orders. Error: ${err}`);
		}
	}

	async show(id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			if (!result.rows[0]) {
				throw new Error(`Order ${id} not found`);
			}
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find order ${id}. ${err}`);
		}
	}

	async create(o: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [o.status, o.user_id]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(`Could not add new order. Error: ${err}`);
		}
	}

	async addProduct(
		order_id: string,
		product_id: string,
		quantity: number
	): Promise<Order> {
		try {
			const sql =
				'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [quantity, order_id, product_id]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(
				`Could not add product ${product_id} to order ${order_id}: ${err}`
			);
		}
	}

	async update(o: Order): Promise<Order> {
		try {
			const sql = 'UPDATE orders SET status=($1) WHERE id=($2) RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [o.status, o.id]);
			if (!result.rows[0]) {
				throw new Error(`Order ${o.id} not found`);
			}
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not edit order ${o.id}. ${err}`);
		}
	}

	async delete(id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
			const conn = await client.connect();
			const order = await conn.query('SELECT * FROM orders WHERE id=($1)', [id]);
			if (!order.rows[0]) {
				throw new Error(`Order ${id} not found`);
			}
			await conn.query('DELETE FROM order_products WHERE order_id=($1)', [id]);
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete order ${id}. ${err}`);
		}
	}
}
