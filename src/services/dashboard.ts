import client from '../database';

export class DashboardService {
	async popularProducts() {
		try {
			const sql =
				'SELECT name FROM products INNER JOIN order_products ON products.id=order_products.product_id GROUP BY products.id ORDER BY sum(order_products.quantity) DESC LIMIT 5';
			const conn = await client.connect();
			const products = await conn.query(sql);
			conn.release();
			return products.rows;
		} catch (err) {
			throw new Error(
				`Could not get the products Error: ${(err as Error).message}`
			);
		}
	}

	async currentUserOrder(userId: string) {
		try {
			const sql =
				"SELECT order_id,name,quantity,price,category FROM order_products INNER JOIN orders ON orders.id=order_products.order_id INNER JOIN products ON products.id=product_id WHERE user_id=($1) AND status='true'";
			const conn = await client.connect();
			const result = await conn.query(sql, [userId]);
			if (!result.rows) {
				throw new Error(`Current order for user ${userId} not found`);
			}
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not find current order for user ${userId}. ${err}`);
		}
	}

	async completedUserOrder(userId: string) {
		try {
			const sql =
				"SELECT order_id,name,quantity,price,category FROM order_products INNER JOIN orders ON orders.id=order_products.order_id INNER JOIN products ON products.id=product_id WHERE user_id=($1) AND status='false'";
			const conn = await client.connect();
			const result = await conn.query(sql, [userId]);
			if (!result.rows) {
				throw new Error(`Completed order for user ${userId} not found`);
			}
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Could not find completed order for user ${userId}. ${err}`);
		}
	}
}
